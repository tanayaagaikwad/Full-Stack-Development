import React, { useEffect, useState } from 'react';
import api from '../api';
import content, { categories } from '../constants';

const defaultForm = {
  name: '',
  description: '',
  price: '',
  category: 'Book',
};

const Marketplace = ({ lang }) => {
  const copy = content[lang];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ message: '', error: '', loading: true });

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
      setStatus((current) => ({ ...current, loading: false, error: '' }));
    } catch (error) {
      setStatus((current) => ({ ...current, loading: false, error: copy.fetchError }));
    }
  };

  useEffect(() => {
    fetchItems();
  }, [lang]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price) };
      const response = await api.post('/items', payload);
      setItems((current) => [response.data.item, ...current]);
      setForm(defaultForm);
      setStatus({ loading: false, error: '', message: copy.itemSuccess });
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.error || copy.fetchError, message: '' });
    }
  };

  return (
    <div className="page-grid">
      <section className="page-intro">
        <p className="section-kicker">{copy.marketplace}</p>
        <h2>{copy.latestListings}</h2>
        <p>{copy.marketplaceCopy}</p>
      </section>

      {status.message ? <p className="status success">{status.message}</p> : null}
      {status.error ? <p className="status error">{status.error}</p> : null}

      <section className="dashboard-grid">
        <article className="panel sticky-panel">
          <h3>{copy.postAd}</h3>
          <form className="stack-form" onSubmit={handleSubmit}>
            <input name="name" placeholder={copy.name} value={form.name} onChange={handleChange} required />
            <textarea name="description" placeholder={copy.description} value={form.description} onChange={handleChange} required />
            <input name="price" type="number" min="0" placeholder={copy.price} value={form.price} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="primary-button">{copy.submit}</button>
          </form>
        </article>

        <article className="panel">
          <div className="card-grid">
            {!status.loading && items.length === 0 ? <p>{copy.noItems}</p> : null}
            {items.map((item) => (
              <div key={item._id} className="market-card">
                <span className="pill">{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>{copy.price}:</strong> Rs. {item.price}</p>
                <p><strong>{copy.seller}:</strong> {item.sellerID?.name || 'Campus Seller'}</p>
                <p><strong>{copy.status}:</strong> {item.status}</p>
                <button className="secondary-button" type="button">
                  {copy.buy}
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Marketplace;
