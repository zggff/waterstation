import mongoose from 'mongoose'

const connection = {
    isConnected: 0,
}

const connect = async (): Promise<{ error: null }> => {
    if (connection.isConnected) {
        return { error: null }
    }
    try {
        const mongoUri = process.env.MONGO_URI
        const db = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        connection.isConnected = db.connections[0].readyState
        return { error: null }
    } catch (e) {
        console.log(e)
        return { error: e }
    }
}

export default connect
