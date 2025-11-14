import { ISermon } from '@/models/Sermon';
import { IEvent } from '@/models/Event';
import { IDonation } from '@/models/Donation';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function getLatestSermons(limit: number = 3): Promise<ISermon[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sermons?limit=${limit}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sermons');
    }
    
    const data = await response.json();
    return data.sermons;
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
}

export async function getSermons(params: { search?: string } = {}): Promise<ISermon[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/sermons`);
    if (params.search) {
      url.searchParams.set('search', params.search);
    }
    
    const response = await fetch(url.toString(), {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sermons');
    }
    
    const data = await response.json();
    return data.sermons;
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
}

export async function getUpcomingEvents(limit: number = 3): Promise<IEvent[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events?limit=${limit}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function createDonation(donationData: Partial<IDonation>): Promise<IDonation | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating donation:', error);
    return null;
  }
}