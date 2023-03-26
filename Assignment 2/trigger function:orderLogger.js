exports = function(changeEvent) {
  const docId = changeEvent.documentKey._id;
  const type = changeEvent.operationType;
  const order = changeEvent.fullDocument;
  const update = changeEvent.updateDescription

  const mongodb = context.services.get("Cluster0");
  const logger = mongodb.db("AmazonBooks").collection("orderLog");

  if(type === "insert"){
    logger.insertOne({
      inserted: order
    }).then(logger => {console.log(JSON.stringify(logger))})
  }
  else {
    logger.insertOne({
      inserted: order,
      updateDescription: update
    }).then(logger => {console.log(JSON.stringify(logger))})
  }
};