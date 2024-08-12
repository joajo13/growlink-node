exports.response = function(res, status, message, data, error = null) {
    let responseJson = {};
    if (!error) {
        responseJson = {
            status: status,
            message: message,
            data
        };
        
        // Custom replacer function
        const replacer = (key, value) => 
            typeof value === 'bigint' 
                ? value.toString() 
                : value; // return everything else unchanged
    
        const jsonString = JSON.stringify(responseJson, replacer);
    
        return res.status(status).json(JSON.parse(jsonString));
    } else {
        responseJson = {
            status: status,
            message: message,
            error: error
        };
        
        return res.status(status).json(responseJson);
    }

}