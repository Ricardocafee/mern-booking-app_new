import express, { Request, Response } from "express"
import Property from "../models/property";
import { BookingType, PropertySearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();


// /api/properties/search?
router.get("/search", async (req:Request, res:Response)=>{
    try {
        const query = constructSearchQuery(req.query)

        let sortOptions = {};
        switch(req.query.sortOption) {
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

        const skip = (pageNumber-1) * pageSize;

        const properties = await Property.find({ ...query, state: "Available" })
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        const total = await Property.countDocuments({ ...query, state: "Available" }); // Count total available properties

        const response: PropertySearchResponse = {
            data: properties,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.get("/", async (req: Request, res: Response)=>{
  try {
    const properties = await Property.find().sort("-lastUpdated")
    res.json(properties);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", [
  param("id").notEmpty().withMessage("Property ID is required")
], async(req: Request, res: Response)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const id = req.params.id.toString();

  try {
    const property = await Property.findById(id);
    res.json(property);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching property"});
  }
});

router.post("/:propertyId/bookings/payment-intent", verifyToken, async(req: Request, res: Response)=>{

  const { numberOfNights } = req.body;
  const propertyId = req.params.propertyId;

  const property = await Property.findById(propertyId);
  if (!property) {
    return res.status(400).json({ message: "Property not found" });
  }

  const totalCost = property.pricePerNight * numberOfNights; 

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "eur",
    metadata: {
      propertyId,
      userId: req.userId,
    },
  });

  if(!paymentIntent.client_secret) {
    return res.status(500).json({message: "Error creating payment intent"});
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);
});

export default router

router.post("/:propertyId/bookings", verifyToken, async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if(!paymentIntent) {
      return res.status(400).json({ message: "something went wrong" });
    }

    if(paymentIntent.metadata.propertyId !== req.params.propertyId  ||
      paymentIntent.metadata.userId !== req.userId) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

    if(paymentIntent.status !== "succeeded"){
      return res.status(400).json({message: `payment intent not succeeded. Status: ${paymentIntent.status}`});
    }

    const newBooking: BookingType = {
      ...req.body, userId: req.userId,
    };

    const property = await Property.findOneAndUpdate({_id: req.params.propertyId}, {
      $push: { bookings: newBooking },
    });

    if(!property) {
      return res.status(400).json({ message: "property not found" });
    }

    await property.save();
    res.status(200).send();


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
})

function constructSearchQuery(queryParams: any) {
    let constructedQuery: any = {};

    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
        { street: new RegExp(queryParams.destination, "i") },
        { neighbourhoodDescription: new RegExp(queryParams.destination, "i") },
        { transport: new RegExp(queryParams.destination, "i")},
      ];
    }

    if(queryParams.state) {
      constructedQuery.state = queryParams.state;
    }

  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }


    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }

    if (queryParams.roomsCounter) {
      constructedQuery.roomsCounter = {
        $all: Array.isArray(queryParams.roomsCounter)
          ? queryParams.roomsCounter
          : [queryParams.roomsCounter],
      };
    }

    if (queryParams.latitude) {
      constructedQuery.latitude = {
        $gte: parseInt(queryParams.latitude),
      };
    }

    if (queryParams.longitude) {
      constructedQuery.longitude = {
        $gte: parseInt(queryParams.longitude),
      };
    }

    if(queryParams.checkIn) {
      if(queryParams.checkIn.startTime) {
        constructedQuery.checkIn.startTime = queryParams.checkIn.startTime;
      }
      if(queryParams.checkIn.endTime) {
        constructedQuery.checkIn.endTime = queryParams.checkIn.endTime;
      }
    }

    if(queryParams.checkOut) {
      constructedQuery.checkOut = queryParams.checkOut;
    }

    if(queryParams.howtoArrive) {
      constructedQuery.howtoArrive = queryParams.howtoArrive;
    }

    if(queryParams.checkInMethod) {
      constructedQuery.checkInMethod = queryParams.checkInMethod;
    }

    if (queryParams.immediateBooking) {
      constructedQuery.immediateBooking = queryParams.immediateBooking;
    }

    if(queryParams.wifi) {
      if (queryParams.wifi.name) {
        constructedQuery.wifi.name = queryParams.name.wifi;
      }

      if (queryParams.wifi.password) {
        constructedQuery.wifi.password = queryParams.name.password;
      }
    }

    if (queryParams.houseManual) {
      constructedQuery.houseManual = queryParams.houseManual;
    }

    if (queryParams.houseRules) {
      if (queryParams.houseRules.name) {
        constructedQuery.houseRules.name = queryParams.houseRules.name;
      }

      if (queryParams.houseRules.allowed) {
        constructedQuery.houseRules.allowed = queryParams.houseRules.allowed;
      }
    }

    if (queryParams.addedRule) {
      constructedQuery.addedRule = queryParams.addedRule;
    }

    if (queryParams.noGuests) {
      constructedQuery.noGuests = queryParams.noGuests;
    }

    if (queryParams.ranking) {
      constructedQuery.ranking = {
        $gte: parseInt(queryParams.ranking),
      };
    }

    if (queryParams.roomsDetails) {
      constructedQuery.roomsDetails = {
        $all: Array.isArray(queryParams.roomsDetails)
          ? queryParams.roomsDetails
          : [queryParams.roomsDetails],
      };
    }

    if(queryParams.securityGuests) {
      constructedQuery.securityGuests = {
        $all: Array.isArray(queryParams.securityGuests)
          ? queryParams.securityGuests
          : [queryParams.securityGuests],
      };
    }
  
    if (queryParams.type) {

      if(queryParams.type.spaceType) {
        constructedQuery.type.spaceType = queryParams.type.spaceType;
      }

      if(queryParams.type.propertyType) {
        constructedQuery.type.propertyType = queryParams.type.propertyType;
      }

      if(queryParams.type.adType) {
        constructedQuery.type.adType = queryParams.type.adType;
      }

      if(queryParams.type.numberFloor) {
        constructedQuery.type.numberFloor = {
          $gte: parseInt(queryParams.type.numberFloor),
        };
      }

      if(queryParams.type.counterFloors) {
        constructedQuery.type.counterFloors = {
          $gte: parseInt(queryParams.type.counterFloors),
        };
      }
      if(queryParams.type.propertySize) {
        constructedQuery.type.propertySize = {
          $gte: parseInt(queryParams.type.propertySize),
        };
      }
    }
    
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
}
