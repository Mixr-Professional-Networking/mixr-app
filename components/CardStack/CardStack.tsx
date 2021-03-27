import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from '../Themed';
//@ts-ignore
import SwipeCards from 'react-native-swipe-cards-deck';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';

function Card({ data }: any) {
  return (
    <View style={styles.card}>
      {/* <Text>{data.text}</Text> */}
      <View style={styles.header}>
        <Text>{data.name || "John Doe"}</Text>
      </View>
      <Text>{data.name || "John Doe"}</Text>
      <Text>{data.position || "Software Engineer at Facebook"}</Text>
      <Text>{data.positionDate || "March 2019-Present"}</Text>
      <Text>{data.eduation || "University of California, Los Angeles Bachelor of Science - BS, Computer Science"}</Text>
      <Text>{data.eduationDate || "2014-2018"}</Text>
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
  header: {
    flex: 0.2,
    backgroundColor: '#5A658B',
    width: Layout.window.width * 0.9
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width * 0.9,
    height: '90%',
    borderRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  cardsText: {
    fontSize: 22,
    color: Colors.dark.text,
  }
});
