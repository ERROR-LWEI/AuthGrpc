import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const AuthGrpcConnect: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6661',
        package: 'auth',
        protoPath: join(__dirname, '../../proto/auth.proto'),
        loader: {
            objects: true
        }
    }
}

export default AuthGrpcConnect