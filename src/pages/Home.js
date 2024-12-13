import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("Smoothies").select();

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);
  return (
   
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        
        <div className="smoothies">
          {smoothies.map((smoothie) => (
            // order-by buttons
            <div className="smoothie-grid">
            <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
