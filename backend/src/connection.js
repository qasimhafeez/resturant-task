import mongoose from 'mongoose'

const connectionString =
	'mongodb+srv://user1:user1@cluster0.bszad.mongodb.net/restaurants?retryWrites=true&w=majority'

export const connnect = mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

