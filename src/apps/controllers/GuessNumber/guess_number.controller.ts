import asyncHandler from "@core/helpers/asyncHandler";
import HttpResponse from "@core/modules/response/HttpResponse";
import route from "@routes/v1";
import { type Request, type Response } from "express";
import GuessNumberService from "@apps/services/GuessNumber/guess_number.service";

route.post(
  "/start_game",
  asyncHandler(async function getTopCoinPairs(req: Request, res: Response) {
    const data = req.getBody();
    await GuessNumberService.start(123)

    const httpResponse = HttpResponse.created({ ok: true });
    res.status(200).json(httpResponse);
  })
);

route.post(
  "/guess",
  asyncHandler(async function getTopCoinPairs(req: Request, res: Response) {
    const data = req.getBody();
    const result = await GuessNumberService.guess(data, 123)

    const httpResponse = HttpResponse.created({ result });
    res.status(200).json(httpResponse);
  })
);
