import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';
import { validateName, validateTC, validatePhone, validateDate } from '../utils/validation';
import { formatPhone } from '../utils/formatter';
import { getCities, getDistricts } from '../api/authApi';

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    gender: '',
    phone: '',
    tc: '',
    email: '',
    city: '',
    district: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityData = await getCities();
        setCities(cityData);
      } catch (error) {
        console.error("Şehir verileri alınırken hata oluştu:", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.city) {
        try {
          const districtData = await getDistricts(formData.city);
          setDistricts(districtData);
        } catch (error) {
          console.error("İlçe verileri alınırken hata oluştu:", error);
        }
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [formData.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'phone' ? formatPhone(value) : value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' || name === 'surname') error = validateName(value);
    if (name === 'tc') error = validateTC(value);
    if (name === 'phone') error = validatePhone(value);
    if (name === 'birthdate') error = validateDate(value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err)) {
      alert('Formda hatalar var, lütfen düzeltin.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/applications/', formData);
      alert('Başvuru başarıyla gönderildi!');
      console.log(response.data);
      setFormData({
        name: '',
        surname: '',
        birthdate: '',
        gender: '',
        phone: '',
        tc: '',
        email: '',
        city: '',
        district: '',
        address: '',
      });
    } catch (error) {
      console.error('Başvuru gönderilemedi:', error);
      alert('Başvuru gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  const renderOptions = (list) =>
    list.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));

  return (
    <div className={styles["homepage-form"]}>
      <h2>Başvuru Formu</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Ad" value={formData.name} onChange={handleChange} required />
        {errors.name && <small>{errors.name}</small>}

        <input type="text" name="surname" placeholder="Soyad" value={formData.surname} onChange={handleChange} required />
        {errors.surname && <small>{errors.surname}</small>}

        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        {errors.birthdate && <small>{errors.birthdate}</small>}

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Cinsiyet Seç</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
        </select>

        <input type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} required />
        {errors.phone && <small>{errors.phone}</small>}

        <input type="text" name="tc" placeholder="TC Kimlik No" value={formData.tc} onChange={handleChange} required />
        {errors.tc && <small>{errors.tc}</small>}

        <input type="email" name="email" placeholder="E-posta" value={formData.email} onChange={handleChange} required />

        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">Şehir Seç</option>
          {renderOptions(cities)}
        </select>

        <select name="district" value={formData.district} onChange={handleChange} required>
          <option value="">İlçe Seç</option>
          {renderOptions(districts)}
        </select>

        <textarea name="address" placeholder="Adres" value={formData.address} onChange={handleChange} required />

        <button type="submit">Başvur</button>
      </form>
    </div>
  );
}

export default HomePage;
