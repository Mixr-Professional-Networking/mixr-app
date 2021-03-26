import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//@ts-ignore
import SwipeCards from 'react-native-swipe-cards-deck';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';

function Card({ data }: any) {
  return (
    <View style={styles.card}>
      <Text>Here's the new card</Text>
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

function CardStack(props: { cards: [] }) {
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
      {props.cards ? (
        <SwipeCards
          cards={props.cards}
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

function mapStateToProps(state: {
  cardsReducer: any; //update when cards type gets updated
}) {
  return {
    cards: state.cardsReducer,
  };
}
export default connect(mapStateToProps)(CardStack);

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
