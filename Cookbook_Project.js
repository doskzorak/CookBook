// Book Class: Represents a Book
class Recipe {
  constructor(name, ingredients, preparation, cooking, ) {
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.cooking = cooking;
  }
}

// User Interface
class UI {
  static displayRecipes() {
    const recipes = Store.getRecipes();

    recipes.forEach((recipe) => UI.addRecipeToList(recipe));
  }

  static addRecipeToList(recipe) {
    const list = document.querySelector('#recipe-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${recipe.name}</td>
      <td>${recipe.ingredients}</td>
      <td>${recipe.preparation}</td>
      <td>${recipe.cooking}</td>
      <td><a button class="btn btn-danger brn-sm delete">X</a></td
    `;

    list.appendChild(row);
  }

  static deleteRecipe(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#recipe-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#ingredients').value = '';
    document.querySelector('#preparation').value = '';
    document.querySelector('#cooking').value = '';
  }
}

// Storing Recipes
class Store {
  static getRecipes() {
    let recipes;
    if(localStorage.getItem('recipes') === null) {
      recipes = [];
    } else {
      recipes = JSON.parse(localStorage.getItem('recipes'));
    }

    return recipes;
  }

  static addRecipe(recipe) {
    const recipes = Store.getRecipes();
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  static removeRecipe(cooking) {
    const recipes = Store.getRecipes();

    recipes.forEach((recipe, index) => {
      if(recipe.cooking === cooking) {
        recipes.splice(index, 1);
      }
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
}

// Display Recipes in Library
document.addEventListener('DOMContentLoaded', UI.displayRecipes);

// Add a Recipe
document.querySelector('#recipe-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Form values
  const name = document.querySelector('#name').value;
  const ingredients = document.querySelector('#ingredients').value;
  const preparation = document.querySelector('#preparation').value;
  const cooking = document.querySelector('#cooking').value

  // Validate
  if(name === '' || ingredients === '' || preparation === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate recipe
    const recipe = new Recipe(name, ingredients, preparation, cooking);

    // Add Book to UI
    UI.addRecipeToList(recipe);

    // Add book to store
    Store.addRecipe(recipe);

    // Show success message
    UI.showAlert('Recipe Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Recipe
document.querySelector('#recipe-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteRecipe(e.target);

  // Remove recipe from store
  Store.removeRecipe(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Recipe Removed', 'success');
});
