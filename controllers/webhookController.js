const axios = require('axios');

const webhookFunc = async(req, res) => {
    try{
        const orderId = req.body.queryResult.parameters.orderId;

        console.log("order id: ", orderId);

        const apiURL = "https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus";

        const response = await axios.post(apiURL, { orderId });

        const shipmentDate = response.data.shipmentDate;
        
        const formatDateObj = new Date(shipmentDate);
        const options = {
            weekday : 'long',
            day : '2-digit',
            month : 'short',
            year : 'numeric'
        };
        const newShipDate = formatDateObj.toLocaleDateString('en-US', options);

        console.log(newShipDate);

        const webhookResponse = {
            fulfillmentText : `Your order ${orderId} will be shipped on ${newShipDate}`,
            source : "Fatima Khalid - ICX Test"
        };

        console.log("In webhook func");
        res.json(webhookResponse);

    } catch(error) {
        console.log("Error handling webhook request: ", error);

        const webHookResponse = {
            fulfillmentText : "There was an error processing your request. Please try again",
            source : "Fatima Khalid - ICX Test"
        };

        res.json(webHookResponse);
    }
}

module.exports = { webhookFunc };