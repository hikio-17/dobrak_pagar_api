export class GetCategoryResponseDto {
  category: object;
}

export class webResponse<T> {
  status: string;
  message: string;
  data?: T;
}
