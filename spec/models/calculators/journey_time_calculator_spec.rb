require 'rails_helper'

describe JourneyTimeCalculator do
	
	let(:origin) 				{ double Coordinate, lat: 51.507351, lng: -0.127758 	}
	let(:origin_2)			{ double Coordinate, lat: 51.4, lng: -0.13 						}
	let(:destination) 	{ double Coordinate, lat: 51.551795, lng: -0.064643 	}
	let(:origins)				{ [origin]																						}
	let(:destinations) 	{ [destination]																				}
	let(:destination_2)	{ double Coordinate, lat: 51.5290941, lng: -0.0770731	}

	context 'Requesting a journey time between origin and destination' do

		it 'should return a time given an origin and a destination' do
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).flatten.first).to be_within(600).of(1200)
		end

		it 'should return two times given two origins and one destination' do
			origins << origin_2
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).flatten.first).to be_within(600).of(1200)
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).flatten.last).to be_within(600).of(2200)		
		end

		it 'should return 2 pairs of times given two origins and two destinations' do
			destinations << destination_2
			origins << origin_2
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).count).to eq(2)
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).flatten.count).to eq(4)
			expect(JourneyTimeCalculator.times_between(origins, destinations, :drive).flatten.all?(&:integer?)).to be true
		end

	end

	context 'manipulating journey times' do

		before(:each) { destinations << destination_2 }

		it 'should return cumulative journey times between locations' do
			expect(JourneyTimeCalculator).to receive(:times_between).and_return([[10,20], [20,30]])
			expect(JourneyTimeCalculator.cumulative_times_between(origins, destinations, :drive)).to eq([30,50])
		end

		it 'should return a matrix of origins and destinations of all unique journeys given a set of coordinates' do
			sample = ['c1', 'c2', 'c3']
			expect(JourneyTimeCalculator.unique_journeys(sample)).to eq([[['c1', 'c2'], ['c3']],[['c1'],['c2']]])
			sample << 'c4'
			expect(JourneyTimeCalculator.unique_journeys(sample)).to eq([[['c1', 'c2'], ['c3', 'c4']],[['c1'],['c2']], [['c3'],['c4']]])
		end

		it 'should return the maximum time difference between a set of points' do
			destinations << origin_2
			expect(JourneyTimeCalculator).to receive(:times_between).twice.and_return([10,20], [50])
			expect(JourneyTimeCalculator.max_time_between(destinations,:drive)).to eq(50)
		end

	end
	
end


