const { useState, useEffect } = React;

const App = () => {
  return (
    <>
      <div className="previous">
        <img src="images/previous.svg" alt="Previous" />
      </div>

      <div className="month">December</div>

      <div className="next">
        <img src="images/next.svg" alt="Next" />
      </div>

      <div className="day-of-week">S</div>
      <div className="day-of-week">M</div>
      <div className="day-of-week">T</div>
      <div className="day-of-week">W</div>
      <div className="day-of-week">T</div>
      <div className="day-of-week">F</div>
      <div className="day-of-week">S</div>

      <div></div>
      <div></div>
      <div> </div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <div className="today">14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>20</div>
      <div>21</div>
      <div>22</div>
      <div>23</div>
      <div>24</div>
      <div>25</div>
      <div>26</div>
      <div>27</div>
      <div>28</div>
      <div>29</div>
      <div>30</div>
      <div>31</div>
      <div></div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
