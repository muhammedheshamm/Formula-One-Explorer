import './assets/css/app.css';
import { Button } from './components/ui/button';

function App() {
  return (
    <div>
      <Button className="cursor-pointer" variant="outline" size="lg" onClick={() => alert('Button clicked!')}>
        Default
      </Button>
    </div>
  );
}

export default App;
