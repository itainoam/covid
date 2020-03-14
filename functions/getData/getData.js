// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require('airtable');

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = function(event, context, callback) {
  //pull the required information from your environment variables, which can be set in the Netlify UI
  const {API_URL, API_CLIENT_ID, API_KEY } = process.env;
  
  // THIS FUNCTION FORMATS AND SENDS YOUR RESPONSE BACK TO YOUR FRONT-END
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }
  
  // CONFIGURE YOUR AIRTABLE BASE CONNECTION
  Airtable.configure({
    endpointUrl: API_URL,
    apiKey: API_KEY
  });
  var base = Airtable.base(API_CLIENT_ID);
  base('Table 1').select({
    sort:[{field: "date", direction: "asc"}]
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    send(records);
    
    
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
    
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
  
  /**
   AIRTABLE REQUEST LOGIC GOES HERE, APPENDING TO DATA
   REFERENCE YOUR BASE-SPECIFIC API FOR EXAMPLES OF
   COMMON CRUD OPERATIONS
   */
  
}

// // Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// exports.handler = async (event, context) => {
//   const {API_URL, API_CLIENT_ID, API_KEY } = process.env;
//   // CONFIGURE YOUR AIRTABLE BASE CONNECTION
//   Airtable.configure({
//     endpointUrl: API_URL,
//     apiKey: API_KEY
//   });
//   var base = Airtable.base(API_CLIENT_ID);
//  const data = []
//   try {
//     const subject = event.queryStringParameters.name || 'World'
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: `Hello ${subject}` })
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     }
//   } catch (err) {
//     return { statusCode: 500, body: err.toString() }
//   }
// }


