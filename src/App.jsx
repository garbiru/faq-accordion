import CardList from "./components/CardList";
import { data } from "./data";

function App() {
	return <CardList title="FAQs" list={data} />;
}

export default App;
