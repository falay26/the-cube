class Move {
  up = async (currentX, currentY, levelData) => {
    const horizontal = levelData.h
    let i = 1
    let nextByTarget = ""
    while (true) {
      let nextTarget = levelData.leveldata[currentY * horizontal + currentX - (horizontal * i)]
      if (nextTarget === "E" || nextTarget === "P") {
        i += 1
      }
      else if (nextTarget === "R") {
        i -= 1
        nextByTarget = "R"
        break
      }
      else if (nextTarget === "F") {
        nextByTarget = "F"
        break
      }
      else {
        console.log("Something went wrong!! Check errors Here!!")
        console.log("********************************************")
        console.log("____________________________________________")
      }
      if (((currentY * horizontal + currentX) - (horizontal * i)) < 0) {
        i -= 1
        break
      }
    }
    const data =
    {
      x: 0,
      y: -1 * i,
      nbt: nextByTarget
    }
    return data
  }

  down = async (currentX, currentY, levelData) => {
    const horizontal = levelData.h
    const vertical = levelData.v
    let i = 1
    let nextByTarget = ""
    while (true) {
      let nextTarget = levelData.leveldata[currentY * horizontal + currentX + (horizontal * i)]
      if (nextTarget === "E" || nextTarget === "P") {
        i += 1
      }
      else if (nextTarget === "R") {
        i -= 1
        nextByTarget = "R"
        break
      }
      else if (nextTarget === "F") {
        nextByTarget = "F"
        break
      }
      else {
        console.log("Something went wrong!! Check errors Here!!")
        console.log("********************************************")
        console.log("____________________________________________")
      }
      if (((currentY * horizontal + currentX) + (horizontal * i)) > horizontal * vertical - 1) {
        i -= 1
        break
      }
    }
    const data =
    {
      x: 0,
      y: 1 * i,
      nbt: nextByTarget
    }
    return data
  }

  left = async (currentX, currentY, levelData) => {
    const horizontal = levelData.h
    const vertical = levelData.v
    let i = 1
    let nextByTarget = ""
    while (true) {
      let nextTarget = levelData.leveldata[(currentY * horizontal + currentX) - i]
      if (((currentY * horizontal + currentX + 1) - i) <= horizontal * (currentY)) {
        i -= 1
        break
      }
      else {
        if (nextTarget === "E" || nextTarget === "P") {
          i += 1
        }
        else if (nextTarget === "R") {
          i -= 1
          nextByTarget = "R"
          break
        }
        else if (nextTarget === "F") {
          nextByTarget = "F"
          break
        }
        else {
          console.log("Something went wrong!! Check errors Here!!")
          console.log("********************************************")
          console.log("____________________________________________")
          break
        }
      }
    }
    const data =
    {
      x: -1 * i,
      y: 0,
      nbt: nextByTarget
    }
    return data
  }

  right = async (currentX, currentY, levelData) => {
    const horizontal = levelData.h
    const vertical = levelData.v
    let i = 1
    let nextByTarget = ""
    while (true) {
      let nextTarget = levelData.leveldata[(currentY * horizontal + currentX) + i]
      if (((currentY * horizontal + currentX + 1) + i) > horizontal * (currentY + 1)) {
        i -= 1
        break
      }
      else {
        if (nextTarget === "E" || nextTarget === "P") {
          i += 1
        }
        else if (nextTarget === "R") {
          i -= 1
          nextByTarget = "R"
          break
        }
        else if (nextTarget === "F") {
          nextByTarget = "F"
          break
        }
        else {
          console.log("Something went wrong!! Check errors Here!!")
          console.log("********************************************")
          console.log("____________________________________________")
          break
        }
      }
    }
    const data =
    {
      x: 1 * i,
      y: 0,
      nbt: nextByTarget
    }
    return data
  }
}

const move = new Move();
export default move;