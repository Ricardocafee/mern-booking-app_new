const renderRulesLabel = (ruleType: string, allowedType: string) => {
    if (ruleType === "Pets allowed" && allowedType === 'allowed') {
        return "Pets allowed"
    } else if (ruleType === "Pets allowed" && allowedType === 'disallowed'){
        return "Pets are not allowed";
    } else if (ruleType === "Events allowed" && allowedType === 'allowed'){
        return "Events allowed";
    } else if (ruleType === "Events allowed" && allowedType === 'disallowed'){
        return "Events are not allowed";
    } else if (ruleType === "Smoking, vapourising and the use of electronic cigarettes are allowed" && allowedType === 'allowed'){
        return "Smoking is allowed";
    } else if (ruleType === "Smoking, vapourising and the use of electronic cigarettes are allowed" && allowedType === 'disallowed'){
        return "Smoking is not allowed";
    } else if (ruleType === "Quiet time" && allowedType === 'allowed'){
        return "Quiet time after 10pm";
    } else if (ruleType === "Quiet time" && allowedType === 'disallowed'){
        return "There is no quiet time";
    } else if (ruleType === "Commercial photography and filming allowed" && allowedType === 'allowed'){
        return "Commercial photography and filming allowed";
    } else if (ruleType === "Commercial photography and filming allowed" && allowedType === 'disallowed'){
        return "Commercial photography and filming are not allowed";
    } else if (ruleType === "Not suitable for children aged 2 to 12"){
        return "Not suitable for children aged 2 to 12";
    } else if (ruleType === "Not suitable for babies under 2 years old"){
        return "Not suitable for babies under 2 years old";
    } else if (ruleType === "Swimming pool or hot tub without a gate or lock"){
        return "Swimming pool or hot tub without a gate or lock";
    } else if (ruleType === "Quiet time"){
        return "Quiet time";
    } else if (ruleType === "By the water, like a lake or river"){
        return "By the water, like a lake or river";
    } else if (ruleType === "There are climbing or play structures on the property"){
        return "Climbing or play structures on the property";
    } else if (ruleType === "There are elevated areas without handrails or protection"){
        return "Elevated areas without handrails or protection";
    } else if (ruleType === "There are potentially dangerous animals on the property"){
        return "There are potentially dangerous animals on the property";
    } else if (ruleType === "There is a security camera outside"){
        return "Security camera outside";
    } else if (ruleType === "There is a decibel meter in the accommodation"){
        return "Decibel meter in the accommodation";
    } else if (ruleType === "Carbon monoxide detector installed"){
        return "Carbon monoxide detector installed";
    } else if (ruleType ==="Smoke detector installed"){
        return "Smoke detector installed";
    } else if (ruleType ==="Guests have to climb stairs"){
        return "Guests have to climb stairs";
    } else if (ruleType ==="There may be noise during stays"){
        return "There may be noise during stays";
    } else if (ruleType ==="No car park on the property"){
        return "No car park on the property";
    } else if (ruleType ==="The property has shared spaces"){
        return "The property has shared spaces";
    } else if (ruleType ==="There are weapons on the property"){
        return "There are weapons on the property";
    }
    };

    export default renderRulesLabel;