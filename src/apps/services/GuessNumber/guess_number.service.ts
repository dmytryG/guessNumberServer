import {optionsYup} from "@core/helpers/yup";
import APIError from "@core/modules/errors/APIError";
import {guessNumberSchema} from "@apps/schemas/guess_number";
import {numberState} from "@core/constants/numberState";


export default class GuessNumberService {
  private static numbers = new Map<number, number>() // User id : number to guess

  private static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static async start(uid: number): Promise<void> {
    GuessNumberService.numbers.set(uid, GuessNumberService.getRandomNumber(0, 50))
    return
  }

  public static async guess(data: any, uid: number): Promise<string> {
    const value = await guessNumberSchema.guess.validate(data, optionsYup)
    const number = GuessNumberService.numbers.get(uid)
    if (!number) {
      throw new APIError(`Number wasn't created`, 404)
    }
    if (value.number > number) {
      return numberState.LOWER
    } else if (value.number < number) {
      return numberState.HIGHER
    } else {
      await GuessNumberService.start(uid)
      return numberState.GUESSED
    }
  }

}
