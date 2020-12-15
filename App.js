import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonLabel, IonInput, IonText, IonApp, IonPopover, IonButton, IonContent, IonIcon } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//-------------------------------------------
import './components/popover.css';
import { calendarOutline } from 'ionicons/icons';
import logo from './logo.png';

// npm i jspdf
import jsPDF from 'jspdf';

// npm i jspdf-autotable
import 'jspdf-autotable';

let currentDate = new Date();
const currentYear = currentDate.getFullYear();
currentDate = currentDate.toISOString();

const orderData = [
  {
    id: "Vmw5Rh73q", billName: "lasku 1", billContent: [
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
      { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
    ]
  }
];

var invoiceArray = [
  ["Laskun numero", ""],
  ["Viitenumero", ""],
  ["Laskun pvm", ""],
  ["Eräpäivä", ""],
  ["Toimituspvm", ""],
  ["Toimitustapa", ""],
  ["Maksuehto", ""],
  ["Viitteemme", ""],
  ["Viitteenne", ""],
  ["Ostajan tilausnumero", ""],
  ["Viivästyskorko", ""],
  ["Huomautusaika", ""]
];

const invoiceData = [
  {
    "companyName": "",
    "buyerName": "",
    "streetAddress": "",
    "zipCodeTown": "",
    "invoiceNumber": "",
    "referenceNumber": "",
    "invoiceDate": "",
    "dueDate": "",
    "shippingDate": "",
    "shippingMethod": "",
    "paymentCondition": "",
    "ourReference": "",
    "yourReference": "",
    "buyerOrderNumber": "",
    "interestOfLatePayment": "",
    "timeOfComplaint": "",
  },
]

//------------------------------------------------------------------
const jsPdfGenerator = (orderData, invoiceData) => {

  // create new PDF document
  var doc = new jsPDF('p', 'pt');
  doc.page = 1;

  // coordinates & sizes
  const leftMargin = 40;
  const rightMargin = doc.internal.pageSize.getWidth() - 40;
  const tabWidth = doc.internal.pageSize.getWidth() - 80;
  const col2Pos = 200;
  const col3Pos = 300;
  const col4Pos = 420;
  const firstTableStartY = 190;
  const bottomTableMargin = 80;
  const topTableMargin = 80;
  const logoWidth = 102;
  const logoHeight = 23;
  const footerStartY = doc.internal.pageSize.getHeight() - 80;

  //----------------------------------------------------------------
  // image data
  var imgData = new Image();

  imgData.crossOrigin = "Anonymous";
  imgData.src = logo;

  // ------------------------------------------------------
  // first page info field

  doc.setFontSize(10);

  doc.text(leftMargin, 95, invoiceData.companyName);
  doc.text(leftMargin, 105, invoiceData.buyerName);
  doc.text(leftMargin, 115, invoiceData.streetAddress);
  doc.text(leftMargin, 125, invoiceData.zipCodeTown);

  let currentRow = 50;
  var i;
  for (i = 0; i < invoiceArray.length; i++) {
    console.log(i);
    if (invoiceArray[i][1] != "") {
      doc.text(col3Pos, currentRow, invoiceArray[i][0]);
      doc.text(col4Pos, currentRow, invoiceArray[i][1]);
      currentRow = currentRow + 10;
    }
  }




  /*doc.text(col3Pos, 50, "Laskun numero");
  doc.text(col3Pos, 60, "Viitenumero");
  doc.text(col3Pos, 70, "Laskun pvm");
  doc.text(col3Pos, 80, "Eräpäivä");
  doc.text(col3Pos, 90, "Toimituspvm");
  doc.text(col3Pos, 100, "Toimitustapa");
  doc.text(col3Pos, 110, "Maksuehto");
  doc.text(col3Pos, 120, "Viitteemme");
  doc.text(col3Pos, 130, "Viitteenne");
  doc.text(col3Pos, 140, "Ostajan tilausnumero");
  doc.text(col3Pos, 150, "Viivästyskorko");
  doc.text(col3Pos, 160, "Huomautusaika");

  doc.text(col4Pos, 50, invoiceData.invoiceNumber);
  doc.text(col4Pos, 60, invoiceData.referenceNumber);
  doc.text(col4Pos, 70, invoiceData.invoiceDate);
  doc.text(col4Pos, 80, invoiceData.dueDate);
  doc.text(col4Pos, 90, invoiceData.shippingDate);
  doc.text(col4Pos, 100, invoiceData.shippingMethod);
  doc.text(col4Pos, 110, invoiceData.paymentCondition);
  doc.text(col4Pos, 120, invoiceData.ourReference);
  doc.text(col4Pos, 130, invoiceData.yourReference);
  doc.text(col4Pos, 140, invoiceData.buyerOrderNumber);
  doc.text(col4Pos, 150, invoiceData.interestOfLatePayment);
  doc.text(col4Pos, 160, invoiceData.timeOfComplaint);*/

  //-----------------------------------------------------------------
  // create table invoiceData
  // calculate prices & taxes

  var invoiceData = new Array();
  var totalPriceNoTaxes = 0;
  var taxesTotal = 0;

  var i;
  for (i = 0; i < orderData[0].billContent.length; i++) {

    invoiceData[i] = [5];
    // item name
    invoiceData[i][0] = orderData[0].billContent[i].itemName;

    // item price
    invoiceData[i][1] = parseFloat(orderData[0].billContent[i].Price).toFixed(2);

    // amount
    invoiceData[i][2] = orderData[0].billContent[i].Count;

    // tax %
    invoiceData[i][3] = orderData[0].billContent[i].Tax + " %";

    // total price
    invoiceData[i][4] = (orderData[0].billContent[i].Price * orderData[0].billContent[i].Count).toFixed(2);

    //----------------------
    totalPriceNoTaxes += parseFloat(invoiceData[i][4])
    // taxes = (item price * count) * (tax % / 100)
    taxesTotal += (parseFloat(invoiceData[i][1]) * parseFloat(invoiceData[i][2])) * (parseFloat(invoiceData[i][3]) / 100)

  }

  var totalPriceWithTaxes = totalPriceNoTaxes + taxesTotal;

  //------------------------------------------------
  // table header

  doc.line(leftMargin, 175, rightMargin, 175, 'DF');

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: firstTableStartY, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 310 },
      1: { cellWidth: 59, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 69, halign: 'right' },
    },
    body: [['Kuvaus', 'Kpl-hinta', 'Määrä', 'ALV%', 'Yhteensä']],
  });

  // ---------------------------------------------------------------
  // create invoice data table

  doc.setFontSize(10);

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: topTableMargin, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 310 },
      1: { cellWidth: 59, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 69, halign: 'right' },
    },
    body: invoiceData
  })

  // start new page if table does not fit on page

  let finalY = doc.lastAutoTable.finalY;
  if (finalY > 650) {
    doc.addPage();
  };

  // create total sums table

  const kokonaisSummat = [
    ["Yhteensä ilman arvonlisäveroa", totalPriceNoTaxes.toFixed(2)],
    ["Arvonlisävero yhteensä", taxesTotal.toFixed(2)],
    ["Maksettava yhteensä", totalPriceWithTaxes.toFixed(2)]
  ]

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: topTableMargin, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 449, halign: 'right' },
      1: { cellWidth: 69, halign: 'right' },
    },
    body: kokonaisSummat
  })

  // Create header and footer, add page numbers
  var pageCount = doc.internal.getNumberOfPages();
  for (i = 0; i < pageCount; i++) {
    doc.setPage(i);

    // Page header
    doc.addImage(imgData, 'PNG', leftMargin, 15, logoWidth, logoHeight);

    doc.textSize = 10;
    doc.text(leftMargin, 55, 'Viherkallionkuja 3 I 59');
    doc.text(leftMargin, 65, '02710, Espoo');

    doc.text(col3Pos, 30, 'Lasku');

    // page footer
    doc.text(leftMargin, footerStartY + 15, "Red Orchid Consulting Oy Ltd");
    doc.text(leftMargin, footerStartY + 25, "Viherkallionkuja 3 I 59");
    doc.text(leftMargin, footerStartY + 35, "02710, Espoo9");
    doc.text(leftMargin, footerStartY + 45, "Puh");
    doc.text(col2Pos, footerStartY + 45, "040-0658026");
    // doc.text(leftMargin, footerStartY + 55, "E-mail");

    doc.text(col3Pos, footerStartY + 15, "Y-tunnus");
    doc.text(col4Pos, footerStartY + 15, "2782601-3");
    doc.text(col3Pos, footerStartY + 25, "ALV-numero");
    doc.text(col4Pos, footerStartY + 25, "FI27826013");

    // page number
    doc.line(leftMargin, footerStartY, rightMargin, footerStartY, 'DF');
    doc.text(col4Pos, 30, doc.internal.getCurrentPageInfo().pageNumber + "(" + pageCount + ")");
  }


  // Save the Data
  doc.save('Generated.pdf');
  return null;
}

//---------------------------------------------------------------


//-----------------------------------------------------
const dateToString = (dt) => {
  var date = new Date(dt);
  let returnString = (date.getDate() + ". " + (+date.getMonth() + 1).toString() + ". " + date.getFullYear()).toString();
  return returnString;
}
//-----------------------------------------------------
const saveInvoiceData = () => {

  // read form data
  invoiceData['companyName'] = document.getElementById('companyName').value;
  invoiceData['buyerName'] = document.getElementById('buyerName').value;
  invoiceData['streetAddress'] = document.getElementById('streetAddress').value;
  invoiceData['zipCodeTown'] = document.getElementById('zipCodeTown').value;
  invoiceArray[0][1] = document.getElementById('invoiceNumber').value;
  invoiceArray[1][1] = document.getElementById('referenceNumber').value;
  if (document.getElementById('invoiceDate').value) {
    invoiceArray[2][1] = dateToString(document.getElementById('invoiceDate').value);
  } else {
    invoiceArray[2][1] = "";
  }
  if (document.getElementById('dueDate').value) {
    invoiceArray[3][1] = dateToString(document.getElementById('dueDate').value);
  } else {
    invoiceArray[3][1] = "";
  }
  if (document.getElementById('shippingDate').value) {
    invoiceArray[4][1] = dateToString(document.getElementById('shippingDate').value);
  } else {
    invoiceArray[4][1] = "";
  }
  invoiceArray[5][1] = document.getElementById('shippingMethod').value;
  invoiceArray[6][1] = document.getElementById('paymentCondition').value;
  invoiceArray[7][1] = document.getElementById('ourReference').value;
  invoiceArray[8][1] = document.getElementById('yourReference').value;
  invoiceArray[9][1] = document.getElementById('buyerOrderNumber').value;
  invoiceArray[10][1] = document.getElementById('interestOfLatePayment').value;
  invoiceArray[11][1] = document.getElementById('timeOfComplaint').value;
  console.log(invoiceData);
  console.log(invoiceArray);

  // tallenna laskun tiedot tässä
  console.log('tallennettu');

  return null;
}

//-----------------------------------------------------
export const InvoiceDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <IonItem>
      <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
      <IonDatetime id="invoiceDate"
        displayFormat="DD MM YYYY"
        min={currentYear - 5}
        max={currentYear + 50}
        onIonChange={e => setSelectedDate(e.detail.value)}>
      </IonDatetime>
    </IonItem>
  )
}

//-----------------------------------------------------
export const DueDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <IonItem>
      <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
      <IonDatetime id="dueDate"
        displayFormat="DD MM YYYY"
        min={currentYear - 5}
        max={currentYear + 50}
        onIonChange={e => setSelectedDate(e.detail.value)}>
      </IonDatetime>
    </IonItem>
  )
}

//-----------------------------------------------------
export const ShippingDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <IonItem>
      <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
      <IonDatetime id="shippingDate"
        displayFormat="DD MM YYYY"
        min={currentYear - 5}
        max={currentYear + 50}
        onIonChange={e => setSelectedDate(e.detail.value)}>
      </IonDatetime>
    </IonItem>
  )
}

//-----------------------------------------------------
export const InvoicePopover = () => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <IonPopover
        isOpen={showPopover}
        cssClass='my-custom-class'
        showBackdrop='true'
        backdropDismiss='false'
        onDidDismiss={e => setShowPopover(false)}
      >
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText color="primary">
                  Ostajan tiedot
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonLabel position="floating">Yrityksen nimi</IonLabel>
            <IonInput id="companyName" required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Yhteyshenkilö</IonLabel>
            <IonInput id="buyerName"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Katuosoite</IonLabel>
            <IonInput id="streetAddress"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Postinumero ja -toimipaikka</IonLabel>
            <IonInput id="zipCodeTown"></IonInput>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText color="primary" className="ion-margin-top">
                  Laskun tiedot
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonLabel position="floating">Laskun numero</IonLabel>
            <IonInput id="invoiceNumber"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Viitenumero</IonLabel>
            <IonInput id="referenceNumber"></IonInput>
          </IonItem>
          <IonItem>
            <IonText>Laskun pvm</IonText>
            <InvoiceDatePicker />
          </IonItem>
          <IonItem>
            <IonText>Eräpäivä</IonText>
            <DueDatePicker />
          </IonItem>
          <IonItem>
            <IonText>Toimituspvm</IonText>
            <ShippingDatePicker />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Toimitustapa</IonLabel>
            <IonInput id="shippingMethod"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Maksuehto</IonLabel>
            <IonInput id="paymentCondition"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Viitteemme</IonLabel>
            <IonInput id="ourReference"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Viitteenne</IonLabel>
            <IonInput id="yourReference"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Ostajan tilausnumero</IonLabel>
            <IonInput id="buyerOrderNumber"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Viivästyskorko</IonLabel>
            <IonInput id="interestOfLatePayment"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Huomautusaika</IonLabel>
            <IonInput id="timeOfComplaint"></IonInput>
          </IonItem>
          <IonButton onClick={() => {
            saveInvoiceData();
            jsPdfGenerator(orderData, invoiceData);
            setShowPopover(false);
          }}>
            Tallenna lasku
          </IonButton>
          <IonButton onclick={() => setShowPopover(false)}>Poistu tallentamatta</IonButton>
        </IonContent>
      </IonPopover >
      <IonButton onClick={() => setShowPopover(true)}>Syötä laskun tiedot</IonButton>
    </>
  );
};

//-----------------------------------------------------
const App = () => (
  <IonApp>
    <IonContent>
      <InvoicePopover />
    </IonContent>
  </IonApp>
);

export default App;