const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false // removes verbose/obscure logging info
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    defaultValue: "open"
  }
});


const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.beforeValidate((page) => {
  
  console.log('preslug', page.slug);

  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');

  console.log('post-slug', page.slug);
  return page.slug;
})

module.exports = { db, Page, User };
