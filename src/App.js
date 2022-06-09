import "./App.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import GameOverScreen from "./GameOverScreen";
import ComparisonData from "./Data/ComparisonData";
import AnimatedNumber from "react-animated-numbers";
import useMediaQuery from "@mui/material/useMediaQuery";
import WelcomeScreen from "./WelcomeScreen";

function App() {
  const CanChangeSizeOfItem = useMediaQuery("(max-width: 600px)");

  // states

  const [userHasGuessed, setUserHasGuessed] = useState(null);
  const [bgColor, setBgColor] = useState(String);
  const [canShowEmoji, setCanShowEmoji] = useState(false);
  const [userHasGuessedCorrectly, setUserHasGuessedCorrectly] = useState(null);
  const [itemOne, setItemOne] = useState();
  const [itemTwo, setItemTwo] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [firstPageLoad, setFirstPageLoad] = useState(true);

  const resetGame = () => {
    setItemOne(
      ComparisonData[Math.floor(Math.random() * ComparisonData.length)]
    );
    setItemTwo(
      ComparisonData[Math.floor(Math.random() * ComparisonData.length)]
    );
    setGameOver(false);
    setUserHasGuessed(null);
    setCanShowEmoji(false);
    setUserHasGuessedCorrectly(null);
    setScore(0);
  };

  // functions

  const [blacklist, setBlacklist] = useState([]);

  const AddItemToBlacklist = (item) => {
    setBlacklist((blacklist) => [...blacklist, item]);
  };

  const UpdateItems = (correctAnswer) => {
    AddItemToBlacklist(correctAnswer);
    setItemOne(correctAnswer);

    let filterArr = ComparisonData.filter((item) => {
      return !blacklist.includes(item);
    });

    console.log(filterArr);

    setItemTwo(
      ComparisonData[Math.floor(Math.random() * ComparisonData.length)]
    );
    setTimeout(() => {
      setUserHasGuessed(false);
      setCanShowEmoji(false);
      setUserHasGuessedCorrectly(false);
    }, 1000);
  };

  const CheckIfAnswerIsCorrect = (userAnswer, itemOne, itemTwo) => {
    setUserHasGuessed(true);
    let higherPrice;

    if (itemOne.price > itemTwo.price) {
      higherPrice = itemOne;
    } else {
      higherPrice = itemTwo;
    }

    // alllow user to either continue or end game depending on results of previous code

    if (userAnswer.name === higherPrice.name) {
      UpdateItems(itemTwo);
      setCanShowEmoji(true);
      setBgColor("Green");
      setUserHasGuessedCorrectly(true);
      setScore(score + 1);
    } else {
      setBgColor("Red");
      setGameOver(true);
    }
  };

  useEffect(() => {
    const firstItemIndex = Math.floor(Math.random() * ComparisonData.length);
    const secondItemIndex = Math.floor(Math.random() * ComparisonData.length);
    setItemOne(ComparisonData[firstItemIndex]);
    setItemTwo(ComparisonData[secondItemIndex]);
  }, []);

  // animation objects to pass into animated divs

  const AnimateMiddleBoxOnGuess = {
    height: "100px",
    width: "100px",
    backgroundColor: bgColor,
  };

  if (firstPageLoad) {
    return <WelcomeScreen userpassestogame={() => setFirstPageLoad(false)} />;
  } else if (gameOver) {
    return <GameOverScreen score={score} resetGameFunc={() => resetGame()} />;
  } else
    return (
      <Grid
        container
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="score">
          Score: {score}
        </div>
        <Grid
          item
          lg="6"
          xs="12"
          sx={{ backgroundImage: "url(" + itemOne?.img + ")" }}
          className="bgImageStyles"
          style={{ minHeight: CanChangeSizeOfItem ? "50vh" : "100vh" }}
        >
          <div className="overlayFilter"></div>

          <div className="textStyling">
            <span className="importantText">{itemOne?.name}</span>
            <span className="importantText">is worth</span>

            <motion.div className="priceStyles">
              <span>$</span>
              <AnimatedNumber
                includeComma
                animateToNumber={itemOne?.price}
                fontStyle={{ fontSize: 40 }}
                configs={[
                  { mass: 1, tension: 220, friction: 100 },
                  { mass: 1, tension: 180, friction: 130 },
                ]}
              ></AnimatedNumber>
            </motion.div>
          </div>
        </Grid>
        <Grid
          item
          lg="6"
          xs="12"
          className="bgImageStyles"
          sx={{
            backgroundImage: "url(" + itemTwo?.img + ")",
          }}
          style={{ height: CanChangeSizeOfItem ? "50vh" : "100vh" }}
        >
          <div className="overlayFilter"></div>
          <div className="textStyling">
            <span className="importantText">"{itemTwo?.name}"</span>
            <div
              className="guessBtn"
              onClick={() => CheckIfAnswerIsCorrect(itemTwo, itemOne, itemTwo)}
            >
              is more expensive than{" "}
            </div>
            <div
              className="guessBtn"
              onClick={() => CheckIfAnswerIsCorrect(itemOne, itemOne, itemTwo)}
            >
              is less expensive than{" "}
            </div>
            <span className="importantText">"{itemOne?.name}"</span>
          </div>
        </Grid>
        <div className="vsButtonCenter">VS</div>
        <AnimatePresence>
          {userHasGuessedCorrectly && (
            <motion.div
              initial={{ height: 0, width: 100 }}
              animate={AnimateMiddleBoxOnGuess}
              className="centerBox"
              exit={{ height: 0, opacity: 0 }}
            >
              {canShowEmoji && userHasGuessedCorrectly && "✔️"}
              {canShowEmoji && !userHasGuessedCorrectly && "❌"}
            </motion.div>
          )}
        </AnimatePresence>
      </Grid>
    );
}

export default App;
