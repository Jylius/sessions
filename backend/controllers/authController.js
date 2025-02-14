const bcrypt = require('bcrypt');
const User = require('../models/AuthUser');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Kullanıcı adı ve şifre gerekli');
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Bu kullanıcı adı zaten mevcut');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).send('Kullanıcı başarıyla oluşturuldu');
  } catch (err) {
    console.error(err);
    res.status(500).send('Sunucu hatası');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Kullanıcı adı ve şifre gerekli');
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Kullanıcı bulunamadı');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Şifre yanlış');
    }

    req.session.user = {
      id: user._id,
      username: user.username
    };
    res.send('Giriş başarılı');
  } catch (err) {
    console.error(err);
    res.status(500).send('Sunucu hatası');
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Çıkış yapılamadı');
    }
    res.send('Çıkış başarılı');
  });
};

module.exports = { register, login, logout };
