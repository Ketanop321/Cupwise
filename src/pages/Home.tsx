import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, TreePine, Users, Award, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3)',
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Save the Planet, One Cup at a Time</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our mission to reduce paper cup waste and create a sustainable future for generations to come.
          </p>
          <Link
            to="/auth"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center"
          >
            Get Started <ChevronRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Movement?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Coffee className="h-8 w-8 text-green-500" />}
              title="Track Your Impact"
              description="Monitor your daily cup savings and see your environmental impact grow over time."
            />
            <FeatureCard
              icon={<TreePine className="h-8 w-8 text-green-500" />}
              title="Environmental Awareness"
              description="Learn about the environmental impact of disposable cups and how to make better choices."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-green-500" />}
              title="Join the Community"
              description="Connect with like-minded individuals and share your sustainable journey."
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-green-500" />}
              title="Earn Rewards"
              description="Complete challenges and earn points for choosing sustainable alternatives."
            />
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Collective Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ImpactStat number="1M+" label="Cups Saved" />
            <ImpactStat number="50K+" label="Active Members" />
            <ImpactStat number="100+" label="Partner Cafes" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ImpactStat = ({ number, label }) => (
  <div>
    <div className="text-4xl font-bold mb-2">{number}</div>
    <div className="text-green-200">{label}</div>
  </div>
);

export default Home;