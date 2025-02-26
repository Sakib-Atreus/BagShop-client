import React from 'react';
import SellingMade from '../components/SellingMade/SellingMade';
import NewsletterSection from '../components/closetProducts/NewsletterSection';
import NewSellingMade from '../components/SellingMade/NewSellingMade';

const Selling = () => {
  return (
    <div className='bg-white'>
      {/* <SellingMade /> */}
      <NewSellingMade />
      <NewsletterSection />
    </div>
  );
};

export default Selling;