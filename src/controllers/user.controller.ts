import {
  Controller,
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  SuccessResponse,
  Example,
} from 'tsoa';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { ResponseUserDto } from '../dtos/user/responseUser.dto';
import { ExampleUser } from '../utils/examples';
import { ManageUser } from '../usecases/user/manageUser';
import { DomainError } from '../errors/domainError';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  @Get('/')
  public async list(): Promise<ResponseUserDto[]> {
    let mu = new ManageUser();
    return await mu.list();
  }

  @Get('{id}')
  public async getById(@Path() id: string): Promise<ResponseUserDto> {
    let mu = new ManageUser();
    const user = await mu.findById(id);
    if (!user) {
      throw new DomainError('USER_NOT_FOUD', 'User not found with id ' + id, {
        id,
      });
    }
    return user;
  }

  @SuccessResponse('201', 'Created')
  @Post('/')
  @Example(ExampleUser)
  public async create(@Body() input: CreateUserDto): Promise<ResponseUserDto> {
    let mu = new ManageUser();
    const user = await mu.create(input);
    return user;
  }
}
