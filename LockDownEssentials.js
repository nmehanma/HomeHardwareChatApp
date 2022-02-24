//Author Najeam Mehanmal - 7457195
const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SEASON: Symbol("season"),
  WINTER: Symbol("winter"),
  SUMMER: Symbol("summer"),
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
        aReturn.push(
          `For a list of what we sell please select the link below:`
        );
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        aReturn.push(
          "When ready please type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials."
        );
        break;
      case OrderState.SEASON:
        this.sSeason = sInput;
        if (sInput.toLowerCase() == "winter") {
          this.stateCur = OrderState.WINTER;
          aReturn.push(
            "What Winter essential item would you like, select SHOVEL for Conestoga's Ergonomics Snow Shovel - $35.99 or SALT for Conestoga's Ice Melter - $15.99, or select BACK to go back"
          );
        } else if (sInput.toLowerCase() == "summer") {
          this.stateCur = OrderState.SUMMER;
          aReturn.push(
            "What Summer essential item would you like, select BUGSPRAY for Conestoga's Bug Spray - $9.99 or TOPSOIL for John's Turf Builder - $6.99, or select BACK to go back"
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
            "Please make a valid selection, either SHOVEL, SALT or BACK"
          );
          break;
        }
        aReturn.push(
          "Would you like a 6 pack of AA batteries on your way to checkout for $6.99? Select YES or NO"
        );
        break;
      case OrderState.SUMMER:
        if (sInput.toLowerCase() == "bugspray") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "bugspray";
        } else if (sInput.toLowerCase() == "topsoil") {
          this.stateCur = OrderState.EXTRAS;
          this.sItem1 = "topsoil";
        } else if (sInput.toLowerCase() == "back") {
          this.stateCur = OrderState.SEASON;
          aReturn.push(
            "Please type WINTER if you are looking for Winter essentials or SUMMER if you are looking for Summer essentials."
          );
          break;
        } else {
          aReturn.push(
            "Please make a valid selection, either BUGSPRAY, TOPSOIL, or BACK"
          );
          break;
        }
        aReturn.push(
          "Would you like a 6 pack of AA batteries on your way to checkout? Select YES or NO"
        );
        break;
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() == "yes") {
          this.sExtras = sInput;
          this.stateCur = OrderState.EXTRAS2;
        } else if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.EXTRAS2;
        } else {
          aReturn.push("Invalid selection, please select either YES or NO");
          break;
        }
        aReturn.push(
          "Would you like warranty on your purchase for an additonal $1.99 today? Select YES or NO"
        );
        break;
      case OrderState.EXTRAS2:
        if (sInput.toLowerCase() == "yes") {
          this.sExtras2 = sInput;
        } else if (sInput.toLowerCase() == "no") {
          this.SExtras2 = "";
        } else {
          aReturn.push("Invalid selection, please select either YES or NO");
          break;
        }
        aReturn.push("Thank-you for your order of");
        this.nTotal = 0;
        if (this.sSeason == "winter" && this.sItem1 == "shovel") {
          aReturn.push("Conestoga's Ergonomics Snow Shovel (22-In)");
          this.nTotal += 35.99;
        } else if (this.sSeason == "winter" && this.sItem1 == "salt") {
          aReturn.push("Conestoga's Ice Melter (Salt) 10kg");
          this.nTotal += 15.99;
        } else if (this.sSeason == "summer" && this.sItem1 == "bugspray") {
          aReturn.push("Bug Spray");
          this.nTotal += 9.99;
        } else if (this.sSeason == "summer" && this.sItem1 == "topsoil") {
          aReturn.push("John's Turf Builder (Top Soil) 42.5 L");
          this.nTotal += 5.99;
        }
        if (this.sExtras) {
          aReturn.push("6 pack of AA batteries");
          this.nTotal += 6.99;
        }
        if (this.sExtras2) {
          aReturn.push("and additional warranty protection with your items.");
          this.nTotal += 1.99;
        }
        aReturn.push(
          `Your total comes to $${this.nTotal.toFixed(2)} before tax and $${(
            this.nTotal * 1.13
          ).toFixed(2)} after tax`
        );
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
      <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
      <style type="text/css">
        ol {
          margin: 0;
          padding: 0;
        }
        table td,
        table th {
          padding: 0;
        }
        .c3 {
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
          width: 262.8pt;
          border-top-color: #000000;
          border-bottom-style: solid;
        }
        .c11 {
          color: #000000;
          font-weight: 700;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 19.5pt;
          font-family: "Arial";
          font-style: normal;
        }
        .c13 {
          color: #000000;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 11pt;
          font-family: "Arial";
          font-style: normal;
        }
        .c2 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: left;
          height: 11pt;
        }
        .c4 {
          color: #000000;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 27pt;
          font-family: "Arial";
          font-style: normal;
        }
        .c0 {
          color: #000000;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 19.5pt;
          font-family: "Arial";
          font-style: normal;
        }
        .c1 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: center;
        }
        .c6 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        .c5 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1;
          text-align: left;
        }
        .c7 {
          border-spacing: 0;
          border-collapse: collapse;
          margin-right: auto;
        }
        .c10 {
          background-color: #ffffff;
          max-width: 525.6pt;
          padding: 28.8pt 43.2pt 43.2pt 43.2pt;
        }
        .c12 {
          font-size: 19.5pt;
        }
        .c8 {
          height: 0pt;
        }
        .c9 {
          height: 11pt;
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
          text-align: left;
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
          text-align: left;
        }
        li {
          color: #000000;
          font-size: 11pt;
          font-family: "Arial";
        }
        p {
          margin: 0;
          color: #000000;
          font-size: 11pt;
          font-family: "Arial";
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
          text-align: left;
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
          text-align: left;
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
          text-align: left;
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
          text-align: left;
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
          text-align: left;
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
          text-align: left;
        }
      </style>
    </head>
    <body class="c10">
      <p class="c1">
        <span class="c11">Welcome to Conestoga&rsquo;s Home Hardware</span>
      </p>
      <p class="c1 c9"><span class="c0"></span></p>
      <p class="c1"><span class="c0">For Curbside pickup:</span></p>
      <p class="c1">
        <span class="c12"
          >Text &ldquo;WINTER&rdquo; or &ldquo;SUMMER&rdquo; to </span
        ><span class="c4">519-111-1111</span>
      </p>
      <p class="c2"><span class="c4"></span></p>
      <p class="c6"><span class="c4">Items Available:</span></p>
      <p class="c2"><span class="c4"></span></p>
      <a id="t.fe6e068fe7bf41904d4e1c1db4fd013f07fdde25"></a><a id="t.0"></a>
      <table class="c7">
        <tbody>
          <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5">
                <span class="c12"
                  >Conestoga&rsquo;s Ergonomics Snow Shovel 22-in</span
                >
              </p>
            </td>
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c12">$35.99</span></p>
            </td>
          </tr>
          <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5">
                <span class="c12">Conestoga&rsquo;s Ice Melter (Salt) 10kg</span>
              </p>
            </td>
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c12">$15.99</span></p>
            </td>
          </tr>
          <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5">
                <span class="c0">Conestoga&rsquo;s Bug Spray 175ml</span>
              </p>
            </td>
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c0">$9.99</span></p>
            </td>
          </tr>
          <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5">
                <span class="c12"
                  >John&rsquo;s Turf Builder (Top Soil) 42.5L</span
                >
              </p>
            </td>
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c12">$5.99</span></p>
            </td>
          </tr>
          <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c0">6 pack AA batteries</span></p>
            </td>
            <td class="c3" colspan="1" rowspan="1">
              <p class="c5"><span class="c0">$6.99</span></p>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="c2"><span class="c4"></span></p>
      <p class="c1">
        <span class="c0"
          >We also have a selection of items in sports, lighting, and our paint
          department for your other essential needs. &nbsp;</span
        >
      </p>
      <p class="c1">
        <span class="c11"
          >Add Warranty to your order for an additional $1.99.</span
        >
      </p>
      <p class="c2"><span class="c4"></span></p>
      <p class="c2"><span class="c0"></span></p>
      <p class="c2"><span class="c0"></span></p>
      <p class="c2"><span class="c0"></span></p>
      <p class="c2"><span class="c4"></span></p>
      <p class="c2"><span class="c13"></span></p>
    </body>
  </html>
        `;
  }
};
