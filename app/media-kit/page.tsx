import Image from 'next/image';

const MediaKitPage = () => {
  return (
    <div className="min-h-screen bg-grey-100">
      {/* Simple Hero Section with repeated WADAV text and image */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          
          {/* Image Section */}
          <div className="bg-white p-8 rounded-lg max-w-4xl mx-auto">
            <Image
              src="/images/mediakit-wadav.jpg"
              alt="WADAV Media Kit"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaKitPage;