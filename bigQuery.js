const { BigQuery } = require('@google-cloud/bigquery');

async function accessBigQueryData(serviceAccountKeyPath) {
  try {
    // Create a BigQuery client with service account credentials
    const bigquery = new BigQuery({
      keyFilename: serviceAccountKeyPath,
    });

    // Define the query
    const query = `SELECT * FROM yout big query dataset`;

    // Run the query
    const options = {
      query,
      location: 'US', // Replace with your desired location
    };
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    // Process the retrieved data
    rows.forEach(row => {
      console.log(row);
    });
  } catch (error) {
    console.error('Error accessing BigQuery data:', error);
  }
}

// Provide the path to your service account key JSON file
const serviceAccountKeyPath = "path to service account key file";
accessBigQueryData(serviceAccountKeyPath).catch(error => {
  console.error('Unhandled promise rejection:', error);
});