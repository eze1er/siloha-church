const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siloha-church';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.db.dropDatabase();
    console.log('Database cleared');

    // Create models
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      emailVerified: Boolean,
      createdAt: Date,
      updatedAt: Date,
    }));

    const Sermon = mongoose.model('Sermon', new mongoose.Schema({
      title: String,
      description: String,
      youtubeId: String,
      publishedAt: Date,
      speaker: String,
      tags: [String],
      isPublished: Boolean,
      views: Number,
      createdAt: Date,
      updatedAt: Date,
    }));

    const Event = mongoose.model('Event', new mongoose.Schema({
      title: String,
      description: String,
      start: Date,
      end: Date,
      location: String,
      organizer: String,
      isPublic: Boolean,
      createdAt: Date,
      updatedAt: Date,
    }));

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@siloha-church.org',
      password: hashedPassword,
      role: 'admin',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create sample sermons
    const sermons = await Sermon.create([
      {
        title: 'La puissance de la foi',
        description: 'Une exploration profonde de la foi et de son impact dans notre vie quotidienne.',
        youtubeId: 'dQw4w9WgXcQ',
        publishedAt: new Date('2024-01-15'),
        speaker: 'Pasteur Jean Martin',
        tags: ['foi', 'vie chrétienne', 'spiritualité'],
        isPublished: true,
        views: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'L\'amour inconditionnel',
        description: 'Comprendre et vivre l\'amour de Dieu dans nos relations.',
        youtubeId: 'dQw4w9WgXcQ',
        publishedAt: new Date('2024-01-08'),
        speaker: 'Pasteur Marie Laurent',
        tags: ['amour', 'relations', 'famille'],
        isPublished: true,
        views: 89,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create sample events
    const events = await Event.create([
      {
        title: 'Culte du dimanche',
        description: 'Rejoignez-nous pour notre culte hebdomadaire avec communion fraternelle.',
        start: new Date('2024-02-04T10:00:00'),
        end: new Date('2024-02-04T12:00:00'),
        location: 'Salle principale',
        organizer: 'Église Siloha',
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Étude biblique - Livre des Romains',
        description: 'Session d\'étude approfondie de l\'épître aux Romains.',
        start: new Date('2024-02-07T19:00:00'),
        end: new Date('2024-02-07T20:30:00'),
        location: 'Salle de conférence',
        organizer: 'Pasteur Jean Martin',
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('Seed data created successfully:');
    console.log(`- Admin user: ${admin.email} (password: admin123)`);
    console.log(`- ${sermons.length} sermons`);
    console.log(`- ${events.length} events`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();