import './featuresSection.scss';
import iconChat from '../../assets/img/icon-chat.png';
import iconMoney from '../../assets/img/icon-money.png';
import iconSecurity from '../../assets/img/icon-security.png';

function FeaturesSection() {
    const features = [
      {
        logo: iconChat,
        title: "You are our #1 priority",
        text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
      },
      {
        logo: iconMoney,
        title: "More savings means higher rates",
        text: "The more you save with us, the higher your interest rate will be!",
      },
      {
        logo: iconSecurity,
        title: "Security you can trust",
        text: "We use top of the line encryption to make sure your data and money is always safe.",
      },
    ];
 
    return (
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
           <div className="feature-item" key={index}> 
            <img src={feature.logo} alt={feature.logo} className="feature-icon"/>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))} 
      </section>
    );
  }
  
  export default FeaturesSection;

  

  