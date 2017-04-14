import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,ListView,TouchableNativeFeedback,Modal,TextInput,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import { createStore } from 'redux';
import { AdMobBanner, AdMobInterstitial, PublisherBanner} from 'react-native-admob';
import TimerMixin from 'react-timer-mixin';

var math=require('mathjs');

AdMobInterstitial.setAdUnitID('ca-app-pub-8752161110911300/7672746877');

const initialState={
    Total:"",
    numCount:0,
    opCount:false,
    historyStore:[],
    errorDisplay:""
};
let opChange=false;
const dotCount=0,turn=0,error=0;
///=----------------------------logical part-----------------------------------

const addButtonPressed = (state=initialState,action)=>{

    if(error==1 && action.type!=="CLEAR"){
        return state;
    }

    let Replace=(act)=>{
        var arr=state.Total.split('');
        arr.pop()

        if(act==="+"){
            arr.push("+");
            state.Total=arr.join('');
            return state.Total;
        }

          if(act==="-"){
            arr.push("-");
            state.Total=arr.join('');
            return state.Total;
        }

          if(act==="÷"){
            arr.push("÷");
            state.Total=arr.join('');
            return state.Total;
        }

          if(act==="x"){
            arr.push("x");
            state.Total=arr.join('');
            return state.Total;
        }

         if(act==="%"){
            arr.push("%");
            state.Total=arr.join('');
            return state.Total;
        }

        if(act==="."){
            arr.push(".");
            state.Total=arr.join('');
            return state.Total;
        }
    }

    if(state.numCount===10 && action.type!=="SUB" && action.type!=="ADD" && action.type!=="DIV" && action.type!=="MUL" && action.type!=="CLEAR" && action.type!=="EQUAL" && action.type!=="BACKSPACE" ){
        return {
            Total:state.Total,
            numCount:state.numCount,
            opCount:state.opCount,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        }
    }

    if(state.opCount===true){
        switch(action.type){
            case "ADD": return {
            Total: Replace("+"),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
         };

        case "SUB": return {
            Total: Replace("-"),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
         };
         case "MUL": return {
            Total:Replace("x"),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "DIV": return {
            Total:Replace("÷"),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "MOD": return {
            Total:Replace("%"),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
        case "DOT": return {
            Total:Replace("."),
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
        }
    }

    switch(action.type){

        case "ONE": return {
            Total:state.Total+"1",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };

        case "TWO": return {
            Total:state.Total+"2",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };


        case "THREE": return {
            Total:state.Total+"3",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
        case "FOUR": return {
            Total:state.Total+"4",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "FIVE": return {
            Total:state.Total+"5",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "SIX": return {
            Total:state.Total+"6",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
        case "SEVEN": return {
            Total:state.Total+"7",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "EIGHT": return {
            Total:state.Total+"8",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "NINE": return {
            Total:state.Total+"9",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "ZERO": return {
            Total:state.Total+"0",
            numCount:state.numCount+1,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "ADD":
            dotCount=0;
        return {
            Total:state.Total + "+",
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
         };

        case "SUB":
        dotCount=0;
         return {
            Total:state.Total + "-",
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
         };
         case "MUL":
         dotCount=0;
         return {
            Total:state.Total+"x",
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "DIV":
         dotCount=0;
          return {
            Total:state.Total+"÷",
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };
         case "MOD":
         dotCount=0;
         return {
            Total:state.Total+"%",
            numCount:0,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        };

        case "EQUAL":
        dotCount=0;

        if(state.errorDisplay!=="ERROR"){
            state.historyStore.push(state.Total);
            state.Total=state.Total.replace(/[x]/g,"*");
            state.Total=state.Total.replace(/[÷]/g,"/");
        }
        var errorFindOut=()=>{
                    try{
                         if(state.Total==="" || state.errorDisplay==="error"){
                            return state.Total
                         }
                         else {
                            return math.round(math.eval(state.Total),5).toString()      //VERY IMPORTANT
                         }
                        }
                        catch(err){

                             state.errorDisplay='error';
                             error=1;
                        }
        }

        return {
            Total: errorFindOut(),
            numCount:state.numCount,
            opCount:state.opCount,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        }

        case "DOT":

        if(dotCount===0){
            dotCount++;
        return {
            Total:state.Total+".",
            numCount:state.numCount+1,
            opCount:true,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
            }
        }else{
            return state;
        };

        case "CLEAR":
        error=0;
        return {
            Total:"",
            numCount:0,
            opCount:state.opCount,
            historyStore:[],
            errorDisplay:""
        };

        case "BACKSPACE":

        if(dotCount==0 && turn==0){
            dotCount=dotCount;
            turn++;
        }

        if(dotCount==0 && turn>0){
            dotCount++;
        }

         if(dotCount>0){
            dotCount=0;
        }

        let arr=state.Total.split('');
        arr.pop();

        if(state.numCount<0){
            state.numCount=0;
        }else{
            state.numCount = state.numCount -1;
        }

            return{
                Total: state.Total=arr.join(''),
                numCount:state.numCount,
                opCount:false,
                historyStore:state.historyStore,
                errorDisplay:state.errorDisplay
            }

         case "root":
         state.historyStore.push(state.Total);
            return {
            Total:math.round(math.sqrt(state.Total),6).toString(),
            numCount:state.numCount,
            opCount:false,
            historyStore:state.historyStore,
            errorDisplay:state.errorDisplay
        }
        default: return state;
    }

};

///=----------------------------logical part-----------------------------------
var store=createStore(addButtonPressed);

class App extends React.Component{
    mixins=[TimerMixin];

    constructor(props) {
      super(props);


      this.state={
        Tvalue:store.getState(),
        modalVisible:false
      };
    }

     setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    componentDidMount(){
        setTimeout(()=>{
        AdMobInterstitial.requestAd(err => "err"  &&  AdMobInterstitial.showAd());
    },4000);
    }

    componentWillMount(){

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const rend=()=>{
        this.setState({
            Tvalue:store.getState(),
            dataSource:ds.cloneWithRows(this.state.Tvalue.historyStore)
        })
      }

      store.subscribe(rend);
      rend();
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#669966' : '#808080',
        }}
      />
    );
  }

    render(){
        return(
                <View style={styles.container}>
                    <TouchableNativeFeedback>
                        <View>
                            <AdMobBanner
                                bannerSize="smartBannerPortrait"
                                adUnitID="ca-app-pub-8752161110911300/7836027276"
                                didFailToReceiveAdWithError={this.bannerError} />

                        </View>
                    </TouchableNativeFeedback>

                    <View  style={styles.textCal}>

                      <View style={{flex:1,justifyContent:"center"}}>

                        <Modal

                     animationType={"slide"}
                     transparent={false}
                     visible={this.state.modalVisible}
                     onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible)}}
                     >
                            <ListView
                                style={{backgroundColor:"#66CCFF"}}
                                enableEmptySections={true}
                                renderSeparator={this._renderSeparator}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) => <Text style={{fontSize:40,textAlign:"right",padding:10}}>{rowData}</Text>}
                              />

                        </Modal>
                          <TouchableNativeFeedback onPress={()=>{this.setModalVisible(true)}}>
                            <View>
                                <Text style={{textAlign:"right",fontSize:35}}>
                                    {this.state.Tvalue.historyStore[this.state.Tvalue.historyStore.length-1]}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        </View>

                        <View style={{flex:0.7}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                scrollEnabled={true}
                                editable={false}
                                style={{fontSize:45,textAlign:"right",color:"black"}}
                                value={(this.state.Tvalue.errorDisplay==="error")?this.state.Tvalue.errorDisplay:this.state.Tvalue.Total}
                            />
                        </View>

                    </View>

                    <View style={styles.buttonRack}>
                        <View style={styles.RowOne}>
                              <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"CLEAR"})}}>
                                <View style={styles.inputButton}>
                                    <Text style={styles.buttonClear}>C</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback   onPress={()=>{store.dispatch({type:"BACKSPACE"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonClear}><Icon style={{fontSize:25}} name="backspace"/></Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback   onPress={()=>{store.dispatch({type:"root"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonRoot}>√</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback   onPress={()=>{store.dispatch({type:"MUL"})}}>
                                    <View style={styles.inputButton}>
                                        <Icon name="clear" style={styles.buttonMul}/>
                                    </View>
                                </TouchableNativeFeedback>
                        </View>

                        <View style={styles.RowOne}>
                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"SEVEN"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>7</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"EIGHT"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>8</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"NINE"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>9</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback onPress={()=>{store.dispatch({type:"SUB"})}}>
                                    <View style={styles.inputButton}>
                                        <Icon name="remove" style={styles.buttonSub}/>
                                    </View>
                                </TouchableNativeFeedback>
                        </View>
                        <View style={styles.RowOne}>

                                <TouchableNativeFeedback onPress={()=>{store.dispatch({type:"FOUR"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>4</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback onPress={()=>store.dispatch({type:"FIVE"})}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>5</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback style={styles.inputButton}
                                    onPress={()=>{store.dispatch({type:"SIX"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>6</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"ADD"})}}>
                                    <View style={styles.inputButton}>
                                        <Icon name="add" style={styles.buttonAdd}/>
                                    </View>
                                </TouchableNativeFeedback>

                        </View>
                        <View style={styles.RowOne}>
                               <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"ONE"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>1</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"TWO"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>2</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"THREE"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>3</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"DIV"})}} >
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonDiv}>÷</Text>
                                    </View>
                                </TouchableNativeFeedback>
                        </View>
                        <View style={styles.RowOne}>
                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"DOT"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>.</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"ZERO"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>0</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"MOD"})}}>
                                    <View style={styles.inputButton}>
                                        <Text style={styles.buttonText}>%</Text>
                                    </View>
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback  onPress={()=>{store.dispatch({type:"EQUAL"})}}>
                                    <View style={styles.inputButton}>
                                        <Icon name="drag-handle" style={styles.buttonEqual}/>
                                    </View>
                                </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            );
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
    },
    textCal:{
        flex:4,
        borderWidth:0,
        backgroundColor:"#B0C4DE"
    },
    buttonRack:{
        flex:7,
        alignItems:"stretch",
        backgroundColor:"#333333"

    },
    RowOne:{
        flex:1,
        flexDirection:"row",
        borderWidth:0.1,
    },
     inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: '#91AA9D',
        borderWidth:0.1,
    },
    buttonText:{
          fontSize:30,
        fontWeight:"normal",
        color:"white",
        textAlign:"center"
    },
      buttonRoot:{
          fontSize:30,
        fontWeight:"normal",
        color:"grey",
        textAlign:"center"
    },
    buttonEqual:{
          fontSize:35,
        fontWeight:"normal",
        textAlign:"center",
        color:"#D4D7FE"
    },
    buttonAdd:{
          fontSize:30,
        fontWeight:"normal",
        color:"teal",
        textAlign:"center"
    },
     buttonSub:{
          fontSize:30,
        fontWeight:"normal",
        color:"red",
        textAlign:"center"
    },
     buttonMul:{
          fontSize:30,
        fontWeight:"normal",
        color:"orange",
        textAlign:"center"
    },
     buttonDiv:{
          fontSize:35,
        fontWeight:"normal",
        color:'#ff66ff',
        textAlign:"center",
    },
       buttonClear:{
          fontSize:30,
        fontWeight:"normal",
        color:'gray',
        textAlign:"center"
    },

});

export default App;