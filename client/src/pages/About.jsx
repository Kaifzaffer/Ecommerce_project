
import Layout from '../components/Layout/Layout'; 
import './About.css'; 

const About = () => {
  return (
    <Layout>
      <div className="about-us">
        <img src="/images/about_img.jpg" alt="About Us Image" className="about-image" />
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget nisl euismod, pulvinar leo sed, convallis tellus. Maecenas nec odio et ante euismod elementum semper at neque. Fusce ac turpis quis leo pretium mattis id at est. Maecenas aliquam consequat risus, nec consectetur risus ultricies eu. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <p>
            Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
