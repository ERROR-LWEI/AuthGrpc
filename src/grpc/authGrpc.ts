import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const AuthGrpcConnect: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: '127.0.0.1:6661',
        package: 'auth',
        protoPath: join(__dirname, '../../proto/auth.proto'),
    }
}

export default AuthGrpcConnect