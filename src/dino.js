//business logic

export class DinoHangman
{
  constructor(dinoName, blankSpots, guessedLetters = [], turnCounter = 0, turnLimit = 10)
  {
    this.dinoName = dinoName;
    this.blankSpots = blankSpots;
    this.guessedLetters = guessedLetters;
    this.turnCounter = turnCounter;
    this.turnLimit = turnLimit;
  }

  setName(newName)
  {
    this.dinoName = newName;
  }
  setBlanks(newBlanks)
  {
    this.blankSpots = newBlanks;
  }

  checkLetter(letter)
  {
    let truth = 0;
    this.guessedLetters.push(letter);
    for(let i = 0;i < this.dinoName.length;i++)
    {
      if(this.dinoName[i] == letter)
      {
        this.blankSpots[i] = letter;
        truth++;
      }
    }
    if(truth == 0)
    {
      this.turnCounter++;
    }
  }

  checkGameOver()
  {
    let winCheck = 0;
    for(let i = 0;i < this.dinoName.length; i++)
    {
      if(this.dinoName[i] == this.blankSpots[i])
      {
        winCheck++;
      }
    }
    if(this.turnCounter == this.turnLimit || winCheck == this.dinoName.length)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
