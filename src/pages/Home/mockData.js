import img1 from "../../static/images/card1.png";
import img2 from "../../static/images/card2.png";
import img3 from "../../static/images/card3.png";
import img4 from "../../static/images/card4.png";
import trendingCard1 from "../../static/images/trendingCard1.png";
import trendingCard2 from "../../static/images/trendingCard2.png";
import trendingCard3 from "../../static/images/trendingCard3.png";
import popularCard1 from "../../static/images/popularCard1.png";
import popularCard2 from "../../static/images/popularCard2.png";
import popularCard3 from "../../static/images/popularCard3.png";
import popularCard4 from "../../static/images/popularCard4.png";
import recipesImg from "../../static/images/recipesImg.png";

export const listMenu = [
  {
    menu: "Vegetarian",
  },
  {
    menu: "Mexican",
  },
  {
    menu: "Greece",
  },
  {
    menu: "Italy Pizza",
  },
  {
    menu: "Philippines",
  },
  {
    menu: "Japan Sushi",
  },
];

export const cardListHighRate = [
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    image: img1,
  },
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    image: img2,
  },
  {
    views: 11700,
    recept: "Pancakes",
    author: "Viktoria Katmer",
    likes: 328,
    comments: 32,
    image: img3,
  },
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    image: img4,
  },
];

export const cardListTrending = [
  {
    views: 12000,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard1,
  },
  {
    views: 12000,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard2,
  },
  {
    views: 11700,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard3,
  },
  {
    views: 12000,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard1,
  },
  {
    views: 12000,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard2,
  },
  {
    views: 11700,
    recept: "Fresh meat with potato",
    author: "John Doe",
    image: trendingCard3,
  },
];

export const cardListHorizontal = [
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img1,
  },
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img2,
  },
  {
    views: 11700,
    recept: "Pancakes",
    author: "Viktoria Katmer",
    likes: 328,
    comments: 32,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img3,
  },
  {
    views: 12000,
    recept: "Fresh meat",
    author: "John Doe",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img4,
  },
];

export const cardListPopular = [
  {
    cookBook: "Its All About Pancakes",
    image: popularCard1,
  },
  {
    cookBook: "Iccceeesream Dream",
    image: popularCard2,
  },
  {
    cookBook: "Fast Breakfast",
    image: popularCard3,
  },
  {
    cookBook: "Fruits and Vegetables",
    image: popularCard4,
  },
];

export const cookBook = [
  {
    cookBook: "Delicious fruits and pancakes",
    author: "Sir John Reed",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum tempus viverra augue ac elit. Interdum libero at tristique fames faucibus. Massa a, consectetur et viverra vulputate urna enim felis metus. Consequat morbi cras elit mauris phasellus at fames eget. Nunc, at vitae integer morbi nibh dignissim non tempus pellentesque. Erat platea augue sed amet, tempor, sed sollicitudin. Viverra tincidunt eu nulla pulvinar eget dolor. Dui, lacus sed ut id egestas elit, mi. Pretium elementum commodo amet cursus massa dictum. Ac, pharetra nisi, morbi maecenas facilisi.",
    image: popularCard1,
  },
];

export const recipes = [
  {
    recipe: "Ice cream with raspberries",
    author: "Sir John Reed",
    likes: 499,
    comments: 12,
    views: 12000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel sit adipiscing dignissim feugiat consectetur. Dolor urna vitae vitae etiam sed commodo. Cursus semper diam commodo laoreet purus orci sed. Nulla varius interdum euismod vestibulum tempus scelerisque felis mauris. Sed neque laoreet habitant pharetra luctus.",
    image: recipesImg,
    steps: [
      {
        step: "Do something",
      },
      {
        step: "Then do something",
      },
      {
        step: "Then do something",
      },
      {
        step: "Then do something",
      },
      {
        step: "Then do something",
      },
      {
        step: "Then do something",
      },
    ],
    ingredients: [
      {
        ingredient: "first ingredient, 100g",
      },
      {
        ingredient: "seoncd ingredient, 200g",
      },
      {
        ingredient: "third ingredient, 300g",
      },
      {
        ingredient: "fourth ingredient, 400g",
      },
    ],
  },
];

export const cookBookResepies = [
  {
    views: 12000,
    recept: "Fresh meat with potato and cheeze",
    author: "John Doe",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img3,
  },
  {
    views: 12000,
    recept: "Fresh meat with potato and cheeze",
    author: "John Doe",
    likes: 499,
    comments: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo non ac eros, velit dapibus consequat vestibulum sapien pharetra. Bibendum vel sollicitudin at purus egestas tincidunt. Vulputate ac, ullamcorper etiam interdum vitae semper.",
    image: img4,
  },
];
