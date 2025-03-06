// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Main App Component
function App() {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<IndexPage setFormData={setFormData} />} />
            <Route path="/farm-sales" element={<FarmSalesPage formData={formData} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

// Navigation Component
function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Fresh Farm Logo" className="farm-logo" />
        <h1>Fresh Farm Produce</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/farm-sales">Farm Sales</Link></li>
      </ul>
    </nav>
  );
}

// Index Page Component
function IndexPage({ setFormData }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    interested: 'vegetables',
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    // Phone validation (optional but validated if provided)
    if (formState.phone && !/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Send data to parent component
      setFormData(formState);
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          message: '',
          phone: '',
          interested: 'vegetables',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="index-page">
      <div className="hero-section">
        <h1>Welcome to Fresh Farm Produce</h1>
        <p>Farm-fresh organic produce delivered to your doorstep</p>
      </div>
      
      <div className="form-section">
        <h2>Contact Us</h2>
        <p>Interested in our farm-fresh products? Fill out the form below!</p>
        
        {submitted ? (
          <div className="success-message">
            <h3>Thank you for your submission!</h3>
            <p>Your information has been recorded. Visit the Farm Sales page to see your data.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="interested">Interested In</label>
              <select
                id="interested"
                name="interested"
                value={formState.interested}
                onChange={handleChange}
              >
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy Products</option>
                <option value="eggs">Farm Fresh Eggs</option>
                <option value="other">Other Products</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="4"
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <button type="submit" className="submit-button">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

// Farm Sales Page Component
function FarmSalesPage({ formData }) {
  const dummyProducts = [
    { id: 1, name: "Organic Tomatoes", price: 2.99, category: "vegetables" },
    { id: 2, name: "Fresh Strawberries", price: 4.99, category: "fruits" },
    { id: 3, name: "Farm Fresh Eggs", price: 3.49, category: "eggs" },
    { id: 4, name: "Organic Milk", price: 3.99, category: "dairy" }
  ];

  return (
    <div className="farm-sales-page">
      <h1>Farm Sales</h1>
      
      <div className="products-section">
        <h2>Our Products</h2>
        <div className="product-grid">
          {dummyProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {formData ? (
        <div className="user-data-section">
          <h2>Your Information</h2>
          <div className="user-data-card">
            <div className="user-data-item">
              <strong>Name:</strong> {formData.name}
            </div>
            <div className="user-data-item">
              <strong>Email:</strong> {formData.email}
            </div>
            {formData.phone && (
              <div className="user-data-item">
                <strong>Phone:</strong> {formData.phone}
              </div>
            )}
            <div className="user-data-item">
              <strong>Interested In:</strong> {formData.interested.charAt(0).toUpperCase() + formData.interested.slice(1)}
            </div>
            <div className="user-data-item">
              <strong>Message:</strong>
              <p className="user-message">{formData.message}</p>
            </div>
          </div>
          
          <div className="recommended-products">
            <h3>Recommended Products Based on Your Interests</h3>
            <div className="product-grid">
              {dummyProducts
                .filter(product => product.category === formData.interested)
                .map(product => (
                  <div key={product.id} className="product-card highlighted">
                    <div className="product-image">
                      <img src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="price">${product.price.toFixed(2)}</p>
                      <button>Add to Cart</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-message">
          <h2>No Data Submitted Yet</h2>
          <p>Please go to the home page and submit the contact form to see your data displayed here.</p>
          <Link to="/" className="cta-button">Go to Contact Form</Link>
        </div>
      )}
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Fresh Farm Produce</h3>
          <p>Bringing farm-fresh goodness directly to your table since 2025.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Farm Road, Countryside</p>
          <p>Email: info@freshfarm.example</p>
          <p>Phone: (+263) 78 045 0035</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <button className="social-link">Facebook</button>
            <button className="social-link">Instagram</button>
            <button className="social-link">Twitter</button>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 Fresh Farm Produce by Team frontend (PSW). All rights reserved.</p>
      </div>
    </footer>
  );
}

export default App;