import React from "react";
import ItemsPage from "./ItemsPage";
import { addItemTags } from "./helpers";
import CheckboxGroup from "./components/CheckboxGroup";

const URL = "https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles";
const LABEL_OPTIONS = [
  { label: "Woodsy", value: "WOODSY" },
  { label: "Fresh", value: "FRESH" },
  { label: "Citrus", value: "CITRUS" },
  { label: "Herbal", value: "HERBAL" },
  { label: "Rich", value: "RICH" },
  { label: "Spiced", value: "SPICED" },
];

const App = () => {
  const [items, setItems] = React.useState(null);
  const [selectedScents, setSelectedScents] = React.useState([]);

  React.useEffect(() => {
    const handleItemRequest = async () => {
      try {
        const res = await fetch(URL);
        if (res.ok) {
          const json = await res.json();
          const productsWithTags = addItemTags(json);
          setItems(productsWithTags);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleItemRequest();
  }, []);

  const handleScentsChange = (e) => {
    const selectedScent = e.target.value;
    if (selectedScents.includes(selectedScent)) {
      setSelectedScents(selectedScents.filter((s) => s !== selectedScent));
    } else {
      setSelectedScents([...selectedScents, selectedScent]);
    }
  };

  const filteredItems = items?.filter((item) => {
    return selectedScents.every((scent) => item.scents.includes(scent));
  });

  return (
    <React.Fragment>
      <CheckboxGroup
        options={LABEL_OPTIONS}
        values={selectedScents}
        onChange={handleScentsChange}
      />
      <ItemsPage data={filteredItems} />
    </React.Fragment>
  );
};

export default App;

/**
 * To begin, I made a request to fetch all the data when the component mounts. 
 * Since we needed labels for each item based on its scent, I created a helper function called "addItemTags." 
 * This function has a scentMap, which is a set of keywords to look for in the "included" array. 
 * It loops through the array and adds scents to a scents array when it finds a keyword, like "pine," for example. 
 * The function adds the scents for each product included in the bundle and includes a check to avoid adding duplicate scents to the array.
 
 * Once all scents are added for a product, I added a "scents" field to the object. 
 * For instance, "Clean & Fresh" would have a new field in the JSON object called "scent: ['WOODSY', 'FRESH']." 
 * I believe this approach was also helpful when filtering by scents.
 * 
 * Next, I broke everything down into small, reusable components. I divided it into "ItemsPage," which loops through the data and passes all necessary information to the card, and "Card," which takes the scent array and maps it to the correct color and label.
 * I preferred this approach since it mimics having color tokens rather than passing down a color to <Chip></Chip>.
 * I created a CheckboxGroup and Checkbox component to abstract them into two reusable components.
 * With a little more time, I would have abstracted them even further to make them entirely reusable for any future use cases.

 * For filtering, I created a handleScentsChange function that performs two tasks. 
 * If we've already selected a checkbox and click it again, it will remove the value from the selectedScents state.
 * If the value hasn't been added yet, we push it to state. 
 * 
 * This state is then used to create our filtered state, where we check the original state and make a copy with or without the selected scents.
 * 
 * Styles: 
 * I chose to go with Grid instead of Flex because looking at the Dr.Squatch it seems like the products are laid out using Grid rather than flex but I think in this use case either or would have worked.
 * I Tried to make the cards mobile friendly (With a bit more time I would have worked on possibly better mobile cards to showcase the product.)
 * (cool little detail Hovering over a title of an item changes the color to the Dr.squatch color)
 * 
 * Next Steps: 
 *  With a bit more time these are some things I would have like to have done for the project
 * 
 * - Add Typesafety 
 * - Add A11Y
 * - Tests for each component - React Testing Library would be great for testing individual components
 * - Abstract more of the component for future uses. 
 * - Possibly move the scent logic to the Backend to avoid having to do the logic on the client side. 
 * - Re-work this using Next.js (This would a really cool project to do with SSR and get a lot of the SEO upsides Next provides.)
 * 
 */
