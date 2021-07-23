import { connect } from 'react-redux';
import { userActions } from '../_actions';
import React from 'react';
import { Link } from 'react-router-dom';

//import { useEffect, useState, useRef } from "react";
//import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   Button,
//   DialogTitle
// } from "@material-ui/core";
//import Card from "./card";
//import "./app.scss";

// const uniqueElementsArray = [
//     {
//       type: "Pikachu",
//       image: require(`./images/Pickachu.png`)
//     },
//     {
//       type: "ButterFree",
//       image: require(`./images/ButterFree.png`)
//     },
//     {
//       type: "Charmander",
//       image: require(`./images/Charmander.png`)
//     },
//     {
//       type: "Squirtle",
//       image: require(`./images/Squirtle.png`)
//     },
//     {
//       type: "Pidgetto",
//       image: require(`./images/Pidgetto.png`)
//     },
//     {
//       type: "Bulbasaur",
//       image: require(`./images/Bulbasaur.png`)
//     }
//   ];

// function shuffleCards(array) {
//   const length = array.length;
//   for (let i = length; i > 0; i--) {
//     const randomIndex = Math.floor(Math.random() * i);
//     const currentIndex = i - 1;
//     const temp = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temp;
//   }
//   return array;
// }

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}
// function HomePage() {
//   const [cards, setCards] = useState(() =>
//     shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
//   );
//   const [openCards, setOpenCards] = useState([]);
//   const [clearedCards, setClearedCards] = useState({});
//   const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
//   const [moves, setMoves] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [bestScore, setBestScore] = useState(
//     JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
//   );
//   const timeout = useRef(null);

//   const disable = () => {
//     setShouldDisableAllCards(true);
//   };
//   const enable = () => {
//     setShouldDisableAllCards(false);
//   };

//   const checkCompletion = () => {
//     if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
//       setShowModal(true);
//       const highScore = Math.min(moves, bestScore);
//       setBestScore(highScore);
//       localStorage.setItem("bestScore", highScore);
//     }
//   };

//   const evaluate = () => {
//     const [first, second] = openCards;
//     enable();
//     if (cards[first].type === cards[second].type) {
//       setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
//       setOpenCards([]);
//       return;
//     }
//     // This is to flip the cards back after 500ms duration
//     timeout.current = setTimeout(() => {
//       setOpenCards([]);
//     }, 500);
//   };
//   const handleCardClick = (index) => {
//     if (openCards.length === 1) {
//       setOpenCards((prev) => [...prev, index]);
//       setMoves((moves) => moves + 1);
//       disable();
//     } else {
//       clearTimeout(timeout.current);
//       setOpenCards([index]);
//     }
//   };

//   useEffect(() => {
//     let timeout = null;
//     if (openCards.length === 2) {
//       timeout = setTimeout(evaluate, 300);
//     }
//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [openCards]);

//   useEffect(() => {
//     checkCompletion();
//   }, [clearedCards]);
//   const checkIsFlipped = (index) => {
//     return openCards.includes(index);
//   };

//   const checkIsInactive = (card) => {
//     return Boolean(clearedCards[card.type]);
//   };

//   const handleRestart = () => {
//     setClearedCards({});
//     setOpenCards([]);
//     setShowModal(false);
//     setMoves(0);
//     setShouldDisableAllCards(false);
//     // set a shuffled deck of cards
//     setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
//   };

//   return (
//     <div className="game">
//       <header>
//         <h3>Play the Flip card game</h3>
//         <div>
//           Select two cards with same content 
//         </div>
//       </header>
//       <div className="container">
//         {cards.map((card, index) => {
//           return (
//             <Card
//               key={index}
//               card={card}
//               index={index}
//               isDisabled={shouldDisableAllCards}
//               isInactive={checkIsInactive(card)}
//               isFlipped={checkIsFlipped(index)}
//               onClick={handleCardClick}
//             />
//           );
//         })}
//       </div>
//       <footer>
//         <div className="score">
//           <div className="moves">
//             <span className="bold">Moves:</span> {moves}
//           </div>
//           {localStorage.getItem("bestScore") && (
//             <div className="high-score">
//               <span className="bold">Best Score:</span> {bestScore}
//             </div>
//           )}
//         </div>
//         <div className="restart">
//           <Button onClick={handleRestart} color="primary" variant="contained">
//             Restart
//           </Button>
//         </div>
//       </footer>
//       <Dialog
//         open={showModal}
//         disableBackdropClick
//         disableEscapeKeyDown
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           Hurray!!! You completed the challenge
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             You completed the game in {moves} moves. Your best score is{" "}
//             {bestScore} moves.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleRestart} color="primary">
//             Restart
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }   
function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };