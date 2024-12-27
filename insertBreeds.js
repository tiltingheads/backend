const mongoose = require('mongoose');
require('dotenv').config(); // Load MongoDB connection URI from .env file
const Breed = require('./models/Breed'); // Adjust the path to your Breed model

const breeds = [
    { "name": "Affenpinscher" },
        { "name": "American Foxhound" },
        { "name": "American Pit Bull Terrier" },
        { "name": "American Staffordshire Terrier" },
        { "name": "Anatolian Shepherd Dog" },
        { "name": "Appenzeller Sennenhund" },
        { "name": "Australian Cattle Dog" },
        { "name": "Australian Kelpie" },
        { "name": "Australian Terrier" },
        { "name": "Barbet" },
        { "name": "Bearded Collie" },
        { "name": "Belgian Malinois" },
        { "name": "Belgian Tervuren" },
        { "name": "Bergamasco Sheepdog" },
        { "name": "Berger Picard" },
        { "name": "Black and Tan Coonhound" },
        { "name": "Black Russian Terrier" },
        { "name": "Bluetick Coonhound" },
        { "name": "Boerboel" },
        { "name": "Bohemian Shepherd" },
        { "name": "Boykin Spaniel" },
        { "name": "Bullmastiff" },
        { "name": "Cairn Terrier" },
        { "name": "Cane Corso" },
        { "name": "Cesky Terrier" },
        { "name": "Chinese Crested" },
        { "name": "Chinook" },
        { "name": "Clumber Spaniel" },
        { "name": "Curly-Coated Retriever" },
        { "name": "Dandie Dinmont Terrier" },
        { "name": "Dutch Shepherd" },
        { "name": "English Foxhound" },
        { "name": "Entlebucher Mountain Dog" },
        { "name": "Field Spaniel" },
        { "name": "Finnish Lapphund" },
        { "name": "French Spaniel" },
        { "name": "German Pinscher" },
        { "name": "Glen of Imaal Terrier" },
        { "name": "Grand Basset Griffon Vendeen" },
        { "name": "Great Pyrenees" },
        { "name": "Hamiltonstovare" },
        { "name": "Harrier" },
        { "name": "Hovawart" },
        { "name": "Ibizan Hound" },
        { "name": "Irish Terrier" },
        { "name": "Irish Water Spaniel" },
        { "name": "Irish Wolfhound" },
        { "name": "Japanese Chin" },
        { "name": "Japanese Spitz" },
        { "name": "Japanese Terrier" },
        { "name": "Kai Ken" },
        { "name": "Kangal Dog" },
        { "name": "Kooikerhondje" },
        { "name": "Lagotto Romagnolo" },
        { "name": "Leonberger" },
        { "name": "Lowchen" },
        { "name": "Manchester Terrier" },
        { "name": "Mudi" },
        { "name": "Neapolitan Mastiff" },
        { "name": "Nederlandse Kooikerhondje" },
        { "name": "Norfolk Terrier" },
        { "name": "Norwich Terrier" },
        { "name": "Nova Scotia Duck Tolling Retriever" },
        { "name": "Otterhound" },
        { "name": "Parson Russell Terrier" },
        { "name": "Plott" },
        { "name": "Polish Lowland Sheepdog" },
        { "name": "Puli" },
        { "name": "Pumi" },
        { "name": "Pyrenean Shepherd" },
        { "name": "Rat Terrier" },
        { "name": "Redbone Coonhound" },
        { "name": "Rhodesian Ridgeback" },
        { "name": "Scottish Deerhound" },
        { "name": "Sealyham Terrier" },
        { "name": "Sloughi" },
        { "name": "Soft-Coated Wheaten Terrier" },
        { "name": "Spanish Water Dog" },
        { "name": "Spinone Italiano" },
        { "name": "Staffordshire Bull Terrier" },
        { "name": "Sussex Spaniel" },
        { "name": "Tibetan Spaniel" },
        { "name": "Toy Fox Terrier" },
        { "name": "Treeing Walker Coonhound" },
        { "name": "Vizsla" },
        { "name": "Wire Fox Terrier" },
        { "name": "Wirehaired Pointing Griffon" }
      
      
    
];

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI ; // Fallback for local development

const insertBreeds = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Insert breeds in bulk
    const result = await Breed.insertMany(breeds, { ordered: false });
    console.log(`${result.length} breeds inserted successfully`);

    mongoose.connection.close();
  } catch (error) {
    if (error.code === 11000) {
      console.error('Some breeds already exist in the database');
    } else {
      console.error('Error inserting breeds:', error);
    }
    mongoose.connection.close();
  }
};

insertBreeds();
