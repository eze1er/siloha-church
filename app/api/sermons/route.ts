import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sermon from '@/models/Sermon';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    let query: any = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { speaker: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sermons = await Sermon.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Sermon.countDocuments(query);

    return NextResponse.json({
      sermons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des sermons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user || (user.role !== 'servant' && user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const data = await request.json();
    
    const sermon = await Sermon.create({
      ...data,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    });

    return NextResponse.json(sermon, { status: 201 });
  } catch (error: any) {
    console.error('Error creating sermon:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du sermon' },
      { status: 500 }
    );
  }
}