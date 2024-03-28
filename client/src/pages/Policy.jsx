// import React from 'react';
import Layout from '../components/Layout/Layout'; // Assuming you have a Layout component
import './policy.css'; // Import your CSS file

const Policy = () => {
  return (
    <Layout>
      <div className="policy">
        <h2>Our Policy</h2>
        <p>
          Thank you for using our website! This page outlines the policies that govern your use of our website and the services we offer. Please read these terms and conditions carefully before using our website.
        </p>

        <h3>1. Use of Website</h3>
        <p>
          By using our website, you agree to be bound by these terms and conditions. You also agree to comply with all applicable laws and regulations. If you disagree with any of these terms and conditions, you are prohibited from using the website.
        </p>

        <h3>2. Content</h3>
        <p>
          The content on our website is provided for informational purposes only. The content is not intended to be a substitute for professional advice, and you should not rely solely on the information presented on our website to make decisions. We make no warranties or guarantees about the accuracy, completeness, or timeliness of the content.
        </p>

        <h3>3. User Conduct</h3>
        <p>
          You agree to use our website in a lawful and responsible manner. You will not use our website for any illegal or unauthorized purpose. You will not interfere with the use of our website by others.
        </p>

        <h3>4. Intellectual Property</h3>
        <p>
          The content on our website, including the text, graphics, logos, and other materials, is protected by copyright and other intellectual property laws. You may not use any of the content on our website without our prior written permission.
        </p>

        <h3>5. Disclaimer</h3>
        <p>
          We make no warranties or guarantees of any kind, express or implied, regarding the operation or performance of our website. We will not be liable for any damages arising from your use of our website.
        </p>

        <h3>6. Governing Law</h3>
        <p>
          These terms and conditions shall be governed by and construed in accordance with the laws of [Your state/country], without regard to its conflict of law provisions.
        </p>

        <h3>7. Changes to Terms and Conditions</h3>
        <p>
          We reserve the right to modify these terms and conditions at any time without prior notice. Please review these terms and conditions periodically for changes. Your continued use of the website following any changes to these terms and conditions will be deemed your acceptance of those changes.
        </p>
      </div>
    </Layout>
  );
};

export default Policy;
