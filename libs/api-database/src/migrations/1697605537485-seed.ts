import { MigrationInterface } from 'typeorm';
import { TaskEntity } from '../entities';

export class Seed1697605537485 implements MigrationInterface {
  public async up(): Promise<void> {
    for (const el of Array.from({ length: 1000 }).map((_, idx) => idx + 1)) {
      await TaskEntity.save(
        TaskEntity.create({
          title: `Task #${el}`,
          description: `Task description #${el}`,
          completed: false,
        })
      );
    }
  }

  public async down(): Promise<void> {
    //
  }
}
