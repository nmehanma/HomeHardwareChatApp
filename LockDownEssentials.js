const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SEASON: Symbol("season"),
  ITEM1: Symbol("item1"),
  EXTRAS: Symbol("extras"),
  EXTRAS2: Symbol("extras2")
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSeason = "";
    this.sItem1 = "";
    this.sExtras = "";
    this.sExtras2 = "";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SEASON;
        aReturn.push("Welcome to Conestoga's Home Hardware.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        aReturn.push(
          "Please type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials."
        );
        break;
      case OrderState.SEASON:
        this.sSeason = sInput;
        if (sInput.toLowerCase() == "winter") {
          this.stateCur = OrderState.WINTER;
          aReturn.push(
            "What Winter essential item would you like, select SHOVEL for Conestoga's Ergonomics Snow Shovel or SALT for Conestoga's Ice Melter, or select BACK to go back"
          );
        } else if (sInput.toLowerCase() == "summer") {
          this.stateCur = OrderState.SUMMER;
          aReturn.push(
            "What Summer essential item would you like, select BUG-SPRAY for Conestoga's Bug Spray or TOP-SOIL for John's Turf Builder, or select BACK to go back"
          );
        } else {
          aReturn.push(
            "Please make a valid selection, type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials. "
          );
        }
        break;
      case OrderState.WINTER:
        if (sInput.toLowerCase() == "shovel") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "shovel";
        } else if (sInput.toLowerCase() == "salt") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "salt";
        } else if (sInput.toLowerCase() == "back") {
          this.stateCur = OrderState.SEASON;
          aReturn.push(
            "Please type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials."
          );
          break;
        } else {
          aReturn.push(
            "Please make a valid selection, either SALT, SHOVEL, or BACK"
          );
          break;
        }
        aReturn.push(
          "Would you like a 6 pack of AA batteries on your way to checkout? Select Yes or No"
        );
        break;
      case OrderState.SUMMER:
        if (sInput.toLowerCase() == "bug-spray") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "bug-spray";
        } else if (sInput.toLowerCase() == "top-soil") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "top-soil";
        } else if (sinput.toLowerCase() == "back") {
          this.stateCur = OrderState.SEASON;
          aReturn.push(
            "Please type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials."
          );
          break;
        } else {
          aReturn.push(
            "Please make a valid selection, either bug-spray, top-soil, or back"
          );
        }
        aReturn.push(
          "Would you like a 6 pack of AA batteries on your way to checkout? Select Yes or No"
        );
        break;
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() == "yes") {
          this.sExtras = sInput;
          this.stateCur = OrderState.EXTRAS2;
        } else if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.EXTRAS2;
        } else {
          aReturn.push("Invalid selection, please select either yes or no");
          break;
        }
        aReturn.push(
          "Would you like warranty on your purchase today? Select YES or NO"
        );
        break;
      case OrderState.EXTRAS2:
        if (sInput.toLowerCase() == "yes") {
          this.sExtras2 = sInput;
        } else if (sInput.toLowerCase() == "no") {
          this.SExtras2 = "";
        } else {
          aReturn.push("Invalid selection, please select either yes or no");
          break;
        }
        aReturn.push("Thank-you for your order of");
        this.nTotal = 0;
        if (this.sSeason == "winter" && this.Item1.toLowerCase() == "shovel") {
          aReturn.push("Conestoga's Ergonomics Snow Shovel 22-In");
          this.nTotal += 35.99;
        } else if (
          this.sSpecies == "summer" &&
          this.Item1.toLowerCase == "salt"
        ) {
          aReturn.push("Conestoga's Ice Melter (Salt) 10kg");
          this.nTotal += 9.99;
        } else if (
          this.sSeason == "summer" &&
          this.sItem1.toLowerCase() == "bugspray"
        ) {
          aReturn.push("Bug Spray");
          this.nTotal += 9.99;
        } else if (
          this.sSpecies == "summer" &&
          this.sFood.toLowerCase == "topsoil"
        ) {
          aReturn.push("John's Turf Builder (Top Soil) 42.5 L");
          this.nTotal += 5.99;
        }
        if (this.sExtras) {
          aReturn.push("6 pack of AA batteries");
          this.nTotal += 6.99;
        }
        if (this.sExtras2) {
          aReturn.push("Warranty with your purchase");
          this.nTotal += 1.99;
        }
        aReturn.push(`Your total comes to ${this.nTotal}`);
        aReturn.push(
          `We will text you from 519-222-2222 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
      <html>
      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c1 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 234pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c13 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 36pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c0 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 26pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c2 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c9 {
                  padding-top: 12pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left;
                  height: 11pt
              }
      
              .c12 {
                  padding-top: 12pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c3 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c10 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c4 {
                  padding-top: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: right
              }
      
              .c8 {
                  padding-top: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c11 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c5 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c6 {
                  height: 48.2pt
              }
      
              .c7 {
                  height: 52pt
              }
      
              .c15 {
                  font-size: 26pt
              }
      
              .c14 {
                  height: 11pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c5">
          <p class="c3"><span
                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p class="c10"><span class="c0">For curbside pickup:</span></p>
          <p class="c12"><span class="c15">Text &ldquo;meow&rdquo; or &ldquo;woof&rdquo; to </span><span
                  class="c13">519-111-1111</span></p>
          <p class="c9"><span class="c2"></span></p><a id="t.d97173251f8e8de98f4d2ef9884eaa81e39c959c"></a><a id="t.0"></a>
          <table class="c11">
              <tbody>
                  <tr class="c7">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Iams Dog Food 10 kg</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">5.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c6">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Iams Cat Food 1kg</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">2.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c6">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Organic Kitty Litter 5kg</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">2.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c9"><span class="c2"></span></p>
          <p class="c12"><span class="c0">We also have a selection of toys, treats and other pet-cessities.</span></p>
          <p class="c3 c14"><span class="c2"></span></p>
      </body>
      
      </html>      `;
  }
};
