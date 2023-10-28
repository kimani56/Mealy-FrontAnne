import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css'; // Ensure you import the styles

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <header>
        <h1>Mealy</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* <li><a href="/menu">Menu</a></li> */}
            <li><a href="/how-it-works">How it Works</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {!isAuthenticated ? (
          <>
            <section className="hero">
              <h2>Delicious Meals, Just a Click Away!</h2>
              <p>From local delicacies to international cuisines, get everything delivered to your doorstep.</p>
              <div className="search-bar">
                <input type="text" placeholder="What are you craving today?" />
                <button>Search</button>
              </div>
              <a href="/register" className="cta-button">Get Started</a>
            </section>

            <section className="services">
              <h3>Why Choose Mealy?</h3>
              <ul>
                <li>
                  <img src="images/fast-delivery.png" alt="Fast Delivery Icon" />
                  <h4>Speedy Delivery</h4>
                  <p>No more long waits. Get your food while it's hot!</p>
                </li>
                <li>
                  <img src="images/diverse-menu.png" alt="Diverse Menu Icon" />
                  <h4>Diverse Menu</h4>
                  <p>Explore a range of cuisines from around the world.</p>
                </li>
                <li>
                  <img src="images/eco-friendly.png" alt="Eco Friendly Icon" />
                  <h4>Eco-Friendly Packaging</h4>
                  <p>We care about the planet as much as you do.</p>
                </li>
              </ul>
            </section>

            <section className="top-restaurants">
              <h3>Top Restaurants</h3>
              {/* Placeholder content. Integrate data fetching here. */}
              <ul>
                <li>Restaurant A</li>
                <li>Restaurant B</li>
                <li>Restaurant C</li>
                {/* ... */}
              </ul>
              <a href="/restaurants">See More</a>
            </section>

            <section className="top-categories">
              <h3>Top Categories</h3>
              {/* Placeholder content. Integrate data fetching here. */}
              <ul>
                <li>Italian</li>
                <li>Mexican</li>
                <li>Chinese</li>
                {/* ... */}
              </ul>
              <a href="/categories">See More</a>
            </section>
          </>
        ) : (
          <p>Welcome back! Here are your dashboard details...</p>
        )}
      </main>

      <footer>
        <p>&copy; 2023 Mealy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
