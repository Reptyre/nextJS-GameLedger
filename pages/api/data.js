const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getData(req, res);
        }

        case 'POST': {
            return addData(req, res);
        }

        case 'PUT': {
            return updateRating(req, res);
        }

        case 'DELETE': {
            return deleteData(req, res);
        }
    }
}

async function getData(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let data = await db
            .collection('data')
            .find({})
            .sort({ rating: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(data)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateRating(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // update the published status of the post
        let test = await db.collection('data').updateOne(
            { _id: new ObjectId(JSON.parse(req.body).id)},
            { $set: {rating: JSON.parse(req.body).rating}}
        )
        // return a message
        return res.json({
            message: 'Rating updated successfully',
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}