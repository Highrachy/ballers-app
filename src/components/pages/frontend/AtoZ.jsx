import React from 'react';
import Header from 'components/layout/Header';
import CommunityGallery from 'components/common/CommunityGallery';
import Footer from 'components/layout/Footer';
import TitleSection from 'components/common/TitleSection';

const AtoZ = () => (
  <>
    <Header />
    <TitleSection
      name="A-Z of BALL"
      content="Great minds BALL. BALLers know what they want and they are motivated to go after the life that they desire and deserve. To BALL is to be a part of a community of exclusive homeowners who are reaching for the future and establishing security for themselves and their loved ones."
    />
    <CommunityGallery />
    <Footer />
  </>
);

export default AtoZ;
