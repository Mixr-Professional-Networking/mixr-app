import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import SwipeCards from 'react-native-swipe-cards-deck';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

function Card({ data }: any) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
    </View>
  );
}

function StatusCard({ text }: any) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function CardStack() {
  const [cards, setCards] = useState([
    { text: 'Tomato', backgroundColor: 'red' },
    { text: 'Aubergine', backgroundColor: 'purple' },
    { text: 'Courgette', backgroundColor: 'green' },
    { text: 'Blueberry', backgroundColor: 'blue' },
    { text: 'Umm...', backgroundColor: 'cyan' },
    { text: 'orange', backgroundColor: 'orange' },
  ]);

  function handleYup(card: { text: string; backgroundColor: string }) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card: { text: string; backgroundColor: string }) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card: { text: string; backgroundColor: string }) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          cards={cards}
          renderCard={(cardData: any) => <Card data={cardData} />}
          keyExtractor={(cardData: { text: any }) => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          handleYup={handleYup}
          handleNope={handleNope}
          handleMaybe={handleMaybe}
          hasMaybeAction={false}
          smoothTransition={false}
          showYup={false}
          showNope={false}
          showMaybe={false}

          // If you want a stack of cards instead of one-per-one view, activate stack mode
          // stack={true}
          // stackDepth={3}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width,
    height: '100%',
    borderRadius: 25,
  },
  cardsText: {
    fontSize: 22,
    color: Colors.dark.text,
  },
});
